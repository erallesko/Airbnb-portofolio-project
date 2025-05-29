const {addFavourite} = require("../models/favourites")

exports.postFavourite = async (req, res, next) => {

    const {id} =req.params;
    const propertyId = parseInt(id)

    const {guest_id} = req.body;

    const rows = await addFavourite(guest_id, propertyId);

    const favouriteId = rows[0].favourite_id
    
    res.status(201).send({msg: "Property favourited successfully.", favourite_id: favouriteId});
}