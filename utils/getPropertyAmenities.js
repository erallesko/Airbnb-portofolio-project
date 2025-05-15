function getPropertyAmenities(propertiesData, propertiesTable){


    const propertyAmenities = propertiesData.map ((property) =>{

        let property_id = 0

        propertiesTable.forEach(row => {
            if (property.name === row.name){
                property_id = row.property_id;
            }
        });
            
        const amenities = property.amenities.map((amenity)=>{
        return [property_id, amenity]
        })


        return amenities;

    })
    
    return propertyAmenities.flat();

}

module.exports = getPropertyAmenities;