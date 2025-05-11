function getBookings (objects, usersData, propertiesData) {

    const arrays = objects.map((object)=>{

        const element = [];

            for (let key in object){

                switch (key) {
                    case "guest_name":
                        usersData.forEach(user => {
                            if (object[key] === `${user.first_name} ${user.surname}`){
                                element.push(user.user_id)
                            }
                        })
                        break;
                    case "property_name":
                        propertiesData.forEach((property)=>{
                            if (object[key] === property.name){
                                element.push(property.property_id)
                            }
                        })
                        break;
                    default :
                        element.push(object[key])

                }
            }
            return element;
        });

   return arrays;
}

module.exports = getBookings;