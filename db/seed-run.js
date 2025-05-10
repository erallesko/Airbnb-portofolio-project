const seed = require('./seed');
const {reviewsData, propertiesData, propertyTypesData, usersData} = require("./data/test")

seed(propertyTypesData, usersData, propertiesData, reviewsData);
