const {fetchBookings, removeBooking, fetchUserBookings} = require("../models/bookings");

exports.getBookings = async (req, res, next) => {

    const {id} = req.params
    const propertyId = parseInt(id);
    
    const rows = await fetchBookings(propertyId);
     
    res.status(200).send({bookings: rows, property_id: propertyId})
};


exports.deleteBooking = async (req, res, next) => {

    const {id} = req.params;
    const propertyId = parseInt(id);

    if(!propertyId){
        return Promise.reject({status: 400, msg: "Invalid input."})
    }

    try{
        const rows = await removeBooking(propertyId);
        res.status(204).send();
    }catch(error){
        next(error);
    };
};


exports.getUserBookings = async (req, res, next) => {

    const {id} = req.params;

    const rows = await fetchUserBookings(id);

    const bookings = {bookings: rows}

    res.status(200).send(bookings)
}