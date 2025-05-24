const db = require("../db/connection");

exports.fetchUser = async (id) => {

    let query = `SELECT user_id, first_name, surname, email, phone_number, avatar, created_at
                   FROM users
                   WHERE users.user_id = ${id}`
    
                   
    const {rows} = await db.query(query)

    return rows
}