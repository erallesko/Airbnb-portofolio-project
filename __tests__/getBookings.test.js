const getBookings = require("../utils/getBookings");

describe("get bookings function", () => {
    test("returns an array", () => {

        const objects = [{food : "pizza"}];

    expect(Array.isArray(getBookings(objects))).toBe(true);
    });
    test("returns the value of an object in an array", () => {

        const objects = [{food : "pizza"}];

    expect(getBookings(objects)).toEqual([["pizza"]])
    });
    test("returns multiple values of an object in an array", () => {

        const objects = [{
                        food:"pizza",
                        meal: "lunch"
        }];

    expect(getBookings(objects)).toEqual([["pizza", "lunch"]]);
    });
    test("returns multiple values from multiple objects in an array", () => {

        const objects = [{
                        food: "pizza",
                        meal: "lunch"
                        },{
                        day: "tuesday",
                        time: 12
                        }];
    
    expect(getBookings(objects)).toEqual([["pizza", "lunch"], ["tuesday", 12]]);
    });
    test("replaces guest name with user id", () => {

        const objects = [{
                        guest_name: "Rachel Cummings",
                        meal: "lunch"
                        },{
                        day: "tuesday",
                        time: 12
                        }];

        const usersData = [{
            user_id: 6,
            first_name: 'Rachel',
            surname: 'Cummings',
            email: 'rachel@example.com',
            phone_number: '+44 7000 666666',
            is_host: false,
            avatar: 'https://example.com/images/rachel.jpg',
            created_at: null
          }]
        
    expect(getBookings(objects, usersData)).toEqual([[6, "lunch"], ["tuesday", 12]]);
    });
    test("replaces property name with property id", () => {

        const objects = [{
                        guest_name: "Rachel Cummings",
                        meal: "lunch"
                        },{
                        day: "tuesday",
                        property_name: 'Bright and Airy Studio'
                        }];

        const usersData = [{
            user_id: 6,
            first_name: 'Rachel',
            surname: 'Cummings',
            email: 'rachel@example.com',
            phone_number: '+44 7000 666666',
            is_host: false,
            avatar: 'https://example.com/images/rachel.jpg',
            created_at: null
          }]

          const propertiesData = [{
            property_id: 11,
            host_id: 1,
            name: 'Bright and Airy Studio',
            location: 'Cambridge, UK',
            property_type: 'Studio',
            price_per_night: '100',
            description: 'Description of Bright and Airy Studio.'
          }]
        
    expect(getBookings(objects, usersData, propertiesData)).toEqual([[6, "lunch"], ["tuesday", 11]]);
    });
});