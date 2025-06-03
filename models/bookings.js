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
};

exports.removeBooking = async (id) => {

    let query = `DELETE FROM bookings
                 WHERE booking_id = $1 RETURNING *`

    const {rows} = await db.query(query, [id]);
   
    if (!rows[0]){
        return Promise.reject({status:404, msg:"Property not found."});
    };
    
    return rows;
};


exports.fetchUserBookings = async (id) => {

    let query = `SELECT booking_id, check_in_date, check_out_date, b.property_id,
                 name AS property_name,
                 u.first_name || ' ' || u.surname AS host,
                 (SELECT image_url 
                  FROM images i
                  WHERE i.property_id = b.property_id
                  ORDER BY image_id
                  LIMIT 1) AS image
                 FROM bookings b
                 JOIN properties p ON b.property_id = p.property_id
                 JOIN users u ON p.host_id = u.user_id
                 WHERE guest_id = $1
                 ORDER BY check_in_date 
`

    const {rows} = await db.query(query, [id]);

    if (!rows[0]){
        return Promise.reject({status:404, msg: "User not found."})
    };

    return rows;
}