function getUsers(objects){

    const arrays = objects.map((object) => {

        const element = [];
        let host = false;

        for (let key in object){

            if (key === "role"){
                if (object[key] === "host"){
                    host = true
                    element.push(host)
                }else {
                    element.push(host)
                 };
            }else {
                element.push(object[key])
            }
        };

        element.push(new Date());
        return element;
    })
    


    return arrays;
}

module.exports = getUsers;
