function getUsers(objects){

    const copyObjects = structuredClone(objects);

    const arrays = copyObjects.map((object) => {

        const element = [];
        let host = false;

        for (let key in object){

            if (key === "role"){
                if (object[key] === "host"){
                    key = "is_host"
                    host = true
                    element.push(host)
                }else {
                    key = "is_host"
                    element.push(host)
                 };
            }else {
                element.push(object[key])
            }
        };

        return element;
    })
    


    return arrays;
}

module.exports = getUsers;
