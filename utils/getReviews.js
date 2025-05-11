function getReviews (objects, propertyData, userData){

    const arrays = objects.map((object)=>{

        element = []

        for (let key in object){

            switch (key){
                case ("property_name"):
                    propertyData.forEach(property => {
                        if (object[key] === property.name){
                            element[0] = property.property_id
                        }
                    });
                    break;
                case ("guest_name") :
                    userData.forEach((user)=>{
                        if (object[key] === `${user.first_name} ${user.surname}`){
                            element[1] = user.user_id
                        }
                    });
                    break;
                case ("rating"):
                    element[2] = object[key]
                    break;
                case ("comment"):
                    element[3] = object[key]
                    break;
                default:
                    element.push(object[key])
            };
        }
        
        element.push(new Date());
        return element;
    });

    return arrays;
}

module.exports = getReviews;