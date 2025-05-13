function getProperties (properties, userData){

    let host_id = 0;

    const propertiesData = properties.map((property)=>{

        userData.forEach((user) => {

            if(`${user.first_name} ${user.surname}` === property.host_name){
                 host_id = user.user_id;
            }
        });

        return [host_id, property.name, property.location, property.property_type, property.price_per_night, property.description];

    });

    return propertiesData;
};

module.exports = getProperties;