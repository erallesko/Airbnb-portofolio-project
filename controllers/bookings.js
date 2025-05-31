const {fetchBookings} = require("../models/bookings");

exports.getBookings = async (req, res, next) => {

    const {id} = req.params
    const propertyId = parseInt(id);
    
    const rows = await fetchBookings(propertyId);

     
    res.status(200).send({bookings: rows, property_id: propertyId})
}