const { use } = require("../app");
const db = require("../db/connection");

exports.fetchUser = async (id) => {

    let query = `SELECT user_id, first_name, surname, email, phone_number, avatar, created_at
                   FROM users
                   WHERE users.user_id = ${id}`
    
                   
    const {rows} = await db.query(query)

    return rows;
}

exports.updateUser = async (userId, first_name, surname, email, phone_number, avatar) => {

    const values = [];

    let query = `UPDATE users 
                 SET `

    if(first_name){
        query += ` first_name = $${values.length + 1} `
        values.push(first_name)
    };

    if(surname){
        if(first_name){
            query += ` ,surname = $${values.length +1}`
        }else{
            query += ` surname = $${values.length +1} `
        };
        values.push(surname);     
    };

    if(email){
        if(first_name || surname){
            query += ` ,email = $${values.length + 1} `
        }else{
            query += ` email = $${values.length + 1} `
        };
        values.push(email);
    };

    if(phone_number){
        if(first_name || surname || email){
            query += ` ,phone_number = $${(values.length + 1)} `
        }else{
            query += ` phone_number = $${(values.length +1)} `
        };
        values.push(phone_number);   
     };

    if(avatar){
        if(first_name || surname || email || phone_number){
            query += ` ,avatar = $${values.length + 1} `
        }else{
            query += ` avatar = $${values.length + 1} `
        };
        values.push(avatar);
    };

    query += `WHERE user_id = $${values.length + 1} `
    values.push(userId);

    query += ` RETURNING user_id, first_name, surname, email, phone_number, is_host, avatar `

    const {rows} = await db.query(query, values);

    return rows;
}