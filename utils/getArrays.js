function getArrays(arrayOfObjects){

const arrayOfArrays = arrayOfObjects.map((object) => {
    const newArr = []

    for (let key in object){
        newArr.push(object[key])
    }

    return newArr;

})

return arrayOfArrays;
}

module.exports = getArrays;
