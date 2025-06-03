const { fetchProperties, fetchProperty, removeFavourite } = require("../models/properties");


exports.getProperties = async (req, res, next) => { 

    const {maxprice, minprice, sort, order, host, amenity} = req.query

    try{
        const rows = await fetchProperties(maxprice, minprice, sort, order, host, amenity);

        properties = {properties : rows}
    
        res.status(200).send(properties);
    }catch(error){
        next(error)
    }
    
};

exports.getProperty = async (req, res, next) => {

    const {user_id} = req.query

    const {id} = req.params;
    
    const propertyId = parseInt(id);
    
    if(!propertyId){
        return Promise.reject({status:400, msg:"Invalid input."})
    }

    try{
        const  rows = await fetchProperty(propertyId, user_id);
        res.status(200).send({property: rows})
    }catch(error){
        next(error);
    }
};

exports.deleteFavourite = async (req, res, next) => {

    const {id} = req.params;

    try{
        const rows = await removeFavourite(id);
        res.status(204).send();
    }catch(error){
        next(error);
    }
    
}