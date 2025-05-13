function getPropertyTypes(propertyTypes){

const propertyTypeData = propertyTypes.map((propertyType) => {
   
    return [propertyType.property_type, propertyType.description];

})

return propertyTypeData;
}

module.exports = getPropertyTypes;
