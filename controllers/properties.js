const { fetchProperties, fetchProperty } = require("../models/properties");


exports.getProperties = async (req, res, next) => { 

    const {maxprice, minprice, sort, order, host} = req.query

    const rows = await fetchProperties(maxprice, minprice, sort, order, host);

    properties = {properties : rows}

    res.status(200).send(properties);
};

exports.getProperty = async (req, res, next) => {

    const {user_id} = req.query

    const {id} = req.params;

    const  rows = await fetchProperty(id, user_id);

    res.status(200).send({property: rows});
};