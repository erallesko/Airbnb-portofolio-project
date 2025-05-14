function getPropertyAmenities(propertiesData, propertiesTable){


    const propertyAmenities = propertiesData.map (property => {

        property_id = 0;

        propertiesTable.forEach(propertyTable => {
            if (property.name === propertyTable.name){
                property_id = propertyTable.property_id
            }
        });

        
        return [property_id, JSON.stringify(property.amenities)]
    })

    return propertyAmenities;
}

module.exports = getPropertyAmenities;