const seed = require('./seed');
const {imagesData, reviewsData, propertiesData, propertyTypesData, usersData} = require("./data/test")

seed(propertyTypesData, usersData, propertiesData, reviewsData, imagesData);
