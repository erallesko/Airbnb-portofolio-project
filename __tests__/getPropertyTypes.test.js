const getPropertyTypes = require("../utils/getPropertyTypes");
const getArrays = require("../utils/getPropertyTypes")

describe("get property types", () =>{
    test ("returns an array", () => {

        const objects = [{ key: "value"}];

        expect(Array.isArray(getPropertyTypes(objects))).toBe(true);
    })
    test ("returns  the value of an object in an array", () => {

        const objects = [{ food: "pizza"}];

        
        expect(getPropertyTypes(objects)).toEqual([["pizza"]]);
    });
    test ("returns the values one object in an array", () => {

        const objects = [{ 
                        food: "pizza",
                        meal: "lunch"}];

        expect(getPropertyTypes(objects)).toEqual([["pizza", "lunch"]]);
    });
    test ("returns the values two objects in an array", () => {

        const objects = [{ 
                        food: "pizza",
                        meal: "lunch"},
                        {day: "monday",
                        week: 56
                                }];

        expect(getPropertyTypes(objects)).toEqual([["pizza", "lunch"], ["monday", 56]]);
    });
})