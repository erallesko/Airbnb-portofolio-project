function getProperties (objects, userData){

    const objectsClone = structuredClone(objects)

    const arrays = objectsClone.map((object)=>{

        const element = [];

        for (let key in object){
            
            if (key === "host_name"){
                userData.forEach(user => {
                    if (`${user.first_name} ${user.surname}` === object[key]){
                        key = "user_id"
                        object[key] = user.user_id
                    }
                });
                element.push(object[key]);
            }
            
            else if (key === "amenities"){
                delete object[key];
            }
            
            else{
                element.push(object[key]);
            };


        }

        return element;
    });

    return arrays;
};

module.exports = getProperties;