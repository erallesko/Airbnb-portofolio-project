function getProperties (objects, userData){

    const objectsClone = structuredClone(objects)

    const arrays = objectsClone.map((object)=>{

        const element = [];

        for (let key in object){

            switch (key){
                case "host_name":
                    userData.forEach(user => {
                        if (`${user.first_name} ${user.surname}` === object[key]){
                            element[0] = user.user_id;
                        }
                    });
                    break;
                case "amenities":
                    delete object[key]
                    break;
                case "name":
                    element[1] = object[key];
                    break;
                case "location":
                    element[2] = object[key];
                    break;
                case "property_type":
                    element[3] = object[key]
                    break;
                case "price_per_night":
                    element[4] = object[key]
                    break;
                default:
                    element.push(object[key])
                    break;
            }
        };

        return element;
    });

    return arrays;
};

module.exports = getProperties;