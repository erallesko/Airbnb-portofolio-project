const db = require("../db/connection")



exports.addFavourite = async (guest_id, propertyId) => {

    let query = `INSERT INTO favourites (guest_id, property_id)
                   VALUES ($1, $2) RETURNING *`

    const {rows} = await db.query(query, [guest_id, propertyId]);

    return rows;
}