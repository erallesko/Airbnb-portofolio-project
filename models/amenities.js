const db = require("../db/connection");

exports.fetchAmenities = async () => {

    let query = `SELECT amenities AS amenity_slug 
                 FROM amenities`

    const {rows} = await db.query(query);

    return rows;
}