const { use } = require("../app");
const db = require("../db/connection")

exports.fetchProperties = async (maxprice, minprice, sort, order = 'DESC', host) => {

const values = []
let optionalWhere = ` p.property_id  IS NOT NULL `


if(host){
    optionalWhere = ` u.user_id = $${values.length + 1} `
    values.push(host);
};   

if(maxprice){
    optionalWhere = ` price_per_night <= $${values.length + 1}`
    values.push(maxprice);
};

if(minprice){
    optionalWhere = ` price_per_night >= $${values.length + 1}`
    values.push(minprice);
};

let query = `SELECT property_id,
                    property_name,
                    location,
                    price_per_night,
                    host,
                    image
                    FROM (
                SELECT DISTINCT ON (p.property_id) 
                    p.property_id,
                    p.name AS property_name,
                    p.location,
                    p.price_per_night,
                    u.first_name || ' ' || u.surname AS host,
                    i.image_url AS image,
                    COUNT(f.property_id) AS favourite_count
                FROM properties p
                JOIN users u ON p.host_id = u.user_id
                JOIN favourites f ON p.property_id = f.property_id
                JOIN images i ON p.property_id = i.property_id
                WHERE ${optionalWhere}
                GROUP BY p.property_id, p.name, u.first_name, u.surname, i.image_url
                ) AS subquery `
                



if(sort === "price_per_night"){
    query += ` ORDER BY  price_per_night `
    }else if(sort === 'popularity' || !sort){
        query += ` ORDER BY  favourite_count `
    }else{
        return Promise.reject({status:400, msg: "Bad query."})
    }

    

if(order === 'ASC'){
        query += ` ASC`
    }else if(order === "DESC"){
        query += ` DESC`
    }else{
        return Promise.reject({status:400, msg: "Bad query."})
    }


const {rows} = await db.query(query, values)

if(rows[0] === undefined){
    return Promise.reject({status:404, msg: "Host not found."})
}
  
return rows;
};




exports.fetchProperty = async (id, user_id) => {

    let values = []
    
    let optionalQuery = ''

    if(user_id){
        optionalQuery = `,  CASE WHEN favourites.guest_id = $${values.length + 1} THEN TRUE
                            ELSE FALSE 
                            END AS favourited`

                            values.push(user_id);
    };

    let query = `SELECT properties.property_id, name AS property_name, location, price_per_night, description,
                 users.first_name ||' '|| users.surname AS host, avatar AS host_avatar, 
                 COUNT (favourites.favourite_id) AS favourite_count, JSON_AGG(image_url) AS images
                  ${optionalQuery} 
                 FROM properties
                 JOIN users ON users.user_id = properties.host_id
                 JOIN favourites ON properties.property_id = favourites.property_id
                 JOIN images ON images.property_id = properties.property_id
                `

   
    query += `WHERE properties.property_id = $${values.length + 1}
              GROUP BY properties.property_id, host, avatar, guest_id`
 
    values.push(id)

    const {rows} = await db.query(query, values);

    if(rows[0] === undefined){
        return Promise.reject({status:404, msg: "Property not found."})
    }

    return rows;
}



exports.removeFavourite = async (id) => {

    query = `DELETE FROM favourites
             WHERE property_id = $1 RETURNING *`

    const {rows} = await  db.query(query, [id]);


    if (!rows[0]){
        return Promise.reject({status:404, msg:"Property not found."});
    };

    return rows;
}