 function getAmenities (properties){

   const amenities = properties.map ((property) => {
    return property.amenities;
   })

   const flatAmenities = amenities.flat();

   const uniqueAmenities = [...new Set(flatAmenities)]

   const finalList = uniqueAmenities.map((amenity)=>{
    return [amenity]
   })

   return finalList;
}

module.exports = getAmenities;

