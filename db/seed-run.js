const db = require("../db/connection")
const seed = require('./seed');
const {bookingsData, favouritesData, imagesData, reviewsData, propertiesData, propertyTypesData, usersData} = require("./data/test")

seed(propertyTypesData, usersData, propertiesData, reviewsData, imagesData, favouritesData, bookingsData).then(()=>{
    db.end()
});
