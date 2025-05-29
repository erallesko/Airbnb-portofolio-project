const { use } = require("../app");
const db = require("../db/connection");

exports.fetchUser = async (id) => {

    let query = `SELECT user_id, first_name, surname, email, phone_number, avatar, created_at
                   FROM users
                   WHERE users.user_id = $1`
    
                   
    const {rows} = await db.query(query, [id])

    if (rows[0] === undefined){
        return Promise.reject({status: 404, msg: "User not found."})
    };

    return rows;
}




exports.updateUser = async (userId, first_name, surname, email, phone_number, avatar) => {

    const values = [];

    const {rows: [userData]} = await db.query(`SELECT * FROM users WHERE user_id =$1`, [userId])
    if(!userData){
      return Promise.reject({status: 404, msg: "User not found."})
    };


    let query = `UPDATE users 
                 SET `

    if(first_name && typeof first_name === "string"){
        query += ` first_name = $${values.length + 1} `
        values.push(first_name)
    };

    if(surname && typeof surname === "string"){
        if(first_name){
            query += ` ,surname = $${values.length +1}`
        }else{
            query += ` surname = $${values.length +1} `
        };
        values.push(surname);     
    };

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

    if(email && emailRegex.test(email)){
        if(first_name || surname){
            query += ` ,email = $${values.length + 1} `
        }else{
            query += ` email = $${values.length + 1} `
        };
        values.push(email);
    };

    const phoneRegex = /^(\+44)+\s7\d{3}\s+\d{6}/g

    if(phone_number && phoneRegex.test(phone_number)){
        if(first_name || surname || email){
            query += ` ,phone_number = $${(values.length + 1)} `
        }else{
            query += ` phone_number = $${(values.length +1)} `
        };
        values.push(phone_number);   
     };

    const avatarRegex = /^(https:\/\/).+.jpg$/g

    if(avatar && avatarRegex.test(avatar)){
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