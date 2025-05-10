const seed = require('./seed');
const {propertiesData, propertyTypesData, usersData} = require("./data/test")

seed(propertyTypesData, usersData, propertiesData);
