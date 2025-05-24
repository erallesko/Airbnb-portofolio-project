const db = require("../db/connection")

exports.fetchProperties = async (maxprice, minprice, sort, order, host) => {

let query = `SELECT properties.property_id, name AS property_name, location, price_per_night, users.first_name ||' '|| users.surname AS host 
                FROM properties
                JOIN users ON users.user_id = properties.host_id`
                
if(/[0-9]+/.test(host)){
    query += ` WHERE users.user_id = ${host}`
};   

if(/[0-9]+/.test(maxprice)){
    query += ` WHERE price_per_night <= ${maxprice}`
};

if(/[0-9]+/.test(minprice)){
    query += ` WHERE price_per_night >= ${minprice}`
};

const allowedSorting = ["price_per_night"];
const allowedOrder = ["ASC", "DESC"];

if(sort){

    if(allowedSorting.includes(sort)){
        query += ` ORDER BY ${sort} `
    }

};

if(order){

    if(allowedOrder.includes(order)){
        query += ` ORDER BY price_per_night ${order}`
    }
}

const {rows} = await db.query(query)
  
return rows;
};




exports.fetchProperty = async (id, user_id) => {

    
    let optionalQuery = ''

    if(/[0-9]+/.test(user_id)){
        optionalQuery = `, 
                            CASE WHEN favourites.guest_id = ${user_id} THEN TRUE
                            ELSE FALSE 
                            END AS favourited`
    };

    let query = `SELECT properties.property_id, name AS property_name, location, price_per_night, description,
                 users.first_name ||' '|| users.surname AS host, avatar AS host_avatar, COUNT (favourites.favourite_id) AS favourite_count ${optionalQuery} 
                 FROM properties
                 JOIN users ON users.user_id = properties.host_id
                 JOIN favourites ON properties.property_id = favourites.property_id
                `

    if(/[0-9]+/.test(id)){
        query += `WHERE properties.property_id = ${id}
                  GROUP BY properties.property_id, host, avatar, guest_id`
    }else{
        query += `GROUP BY properties.property_id, host, avatar`
    };


    

    const {rows} = await db.query(query);

    return rows;
}