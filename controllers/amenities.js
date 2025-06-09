const {fetchAmenities} = require("../models/amenities");

exports.getAmenities = async (req, res, next) => {

    const rows = await fetchAmenities();

    const amenities = {amenities: rows}

    res.status(200).send(amenities);
}