const db = require("../db/connection")

exports.fetchProperties = async () => {

const query = `SELECT property_id, name AS property_name, location, price_per_night, users.first_name ||' '|| users.surname AS host 
                FROM properties
                JOIN users
                ON users.user_id = properties.host_id`

const {rows} = await db.query(query)
  
                return rows;
}