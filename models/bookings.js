const db = require("../db/connection");

exports.fetchBookings = async (propertyId) => {

    let query = `SELECT booking_id, check_in_date, 
                        check_out_date,
                        created_at 
                 FROM  bookings
                 WHERE property_id = $1
                 ORDER BY check_out_date DESC
                 ` 
    
    const {rows} = await db.query(query, [propertyId]);

    if (!rows[0]){
        return Promise.reject({status: 400, msg: "Property not found."})
    };
    
    return rows;
}