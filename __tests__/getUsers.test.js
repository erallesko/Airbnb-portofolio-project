const getUsers = require("../utils/getUsers");

describe("get Users", () => {
    test("returns an array", () => {

        const objects = [{ food: "pizza"}];

        expect(Array.isArray(getUsers(objects))).toBe(true)
    });
    test ("returns  the value of an object in an array", () => {

        const objects = [{ food: "pizza"}];

        
        expect(getUsers(objects)).toEqual([["pizza"]]);
    });
    test ("returns  multiple values of an object in an array", () => {

        const objects = [{ 
                        food: "pizza",
                        meal: "lunch"}];

        expect(getUsers(objects)).toEqual([["pizza", "lunch"]]);
        
    });
    test ("returns  boolean true if key is role with value host", () => {

        const objects = [{ 
                        food: "pizza",
                        meal: "lunch",
                        role: "host"}];

        expect(getUsers(objects)).toEqual([["pizza", "lunch", true]]);
        
    });
    test ("returns  boolean false if key is role with value not host", () => {

        const objects = [{
                        food: "pizza",
                        meal: "lunch",
                        role: "guest"}];

        expect(getUsers(objects)).toEqual([["pizza", "lunch", false]]);
        
    });
    test ("returns  arrays for multiple objects", () => {

        const objects = [{ 
                        food: "pizza",
                        meal: "lunch",
                        role: "host"},
                        { day: "monday",
                        number: "23",
                        role: "guest"}];

        expect(getUsers(objects)).toEqual([["pizza", "lunch", true], ["monday", "23", false]]);
        
    });
    test ("original array is not mutated", () => {

        const objects = [{ food: "pizza",
                                meal: "lunch",
                                is_host: "host"},
                                { day: "monday",
                                number: "23",
                                role: "guest"}];
        
        getUsers(objects);

        expect(objects).toEqual([{ food: "pizza",
            meal: "lunch",
            is_host: "host"},
            { day: "monday",
            number: "23",
            role: "guest"}]);
        
    });
})