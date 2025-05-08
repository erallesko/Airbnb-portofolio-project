const getArrays = require("../utils/getArrays")

describe("get Arrays", () =>{
    test ("returns an array", () => {

        const object = [{ key: "value"}];

        expect(Array.isArray(getArrays(object))).toBe(true);
    })
    test ("returns  the value of an object in an array", () => {

        const arrayOfObjects = [{ food: "pizza"}];

        
        expect(getArrays(arrayOfObjects)).toEqual([["pizza"]]);
    });
    test ("returns the values one object in an array", () => {

        const arrayOfObjects = [{ food: "pizza",
                                meal: "lunch"}];

        expect(getArrays(arrayOfObjects)).toEqual([["pizza", "lunch"]]);
    });
    test ("returns the values two objects in an array", () => {

        const arrayOfObjects = [{ food: "pizza",
                                meal: "lunch"},
                                {day: "monday",
                                week: 56
                                }];

        expect(getArrays(arrayOfObjects)).toEqual([["pizza", "lunch"], ["monday", 56]]);
    });
})