function getImages (objects, propertyData){

    const arrays = objects.map((object)=>{

        const element = []

        for (let key in object){

            switch (key){
                case "property_name":
                    propertyData.forEach(property => {
                        if (object[key] === property.name){
                            element.push(property.property_id)
                        }
                    })
                    break;
                default:
                    element.push(object[key])
            }

          }

        return element;
    });

    return arrays;
};

module.exports = getImages;