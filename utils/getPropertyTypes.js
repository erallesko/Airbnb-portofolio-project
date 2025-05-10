function getPropertyTypes(objects){

const arrays = objects.map((object) => {
    const element = []

    for (let key in object){
        element.push(object[key])
    }

    return element;

})

return arrays;
}

module.exports = getPropertyTypes;
