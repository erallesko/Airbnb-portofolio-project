const { fetchProperties } = require("../models/properties");


exports.getProperties = async (req, res, next) => { 

 const rows = await fetchProperties()

 properties = {properties : rows}
    res.status(200).send(properties);
}