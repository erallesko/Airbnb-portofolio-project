function getImages (images, properties){

    const imagesData = images.map((image)=>{

        property_id = 0;

        properties.forEach(property => {
            
            if (image.property_name === property.name){
                property_id = property.property_id;
            }
        });

        return [property_id, image.image_url, image.alt_tag];

    });

    return imagesData;
};

module.exports = getImages;