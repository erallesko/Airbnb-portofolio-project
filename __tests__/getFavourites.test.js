const getFavourites = require("../utils/getFavourites");

describe("get favourites function", () => {
    test("returns an array", () => {

        const objects = [{food : "pizza"}];

    expect(Array.isArray(getFavourites(objects))).toBe(true);
    });
    test("returns the value of an object in an array", () => {

        const objects = [{food : "pizza"}];

    expect(getFavourites(objects)).toEqual([["pizza"]])
    });
    test("returns multiple values of an object in an array", () => {

        const objects = [{
                        food:"pizza",
                        meal: "lunch"
        }];

    expect(getFavourites(objects)).toEqual([["pizza", "lunch"]]);
    });
    test("returns multiple values from multiple objects in an array", () => {

        const objects = [{
                        food: "pizza",
                        meal: "lunch"
                        },{
                        day: "tuesday",
                        time: 12
                        }];
    
    expect(getFavourites(objects)).toEqual([["pizza", "lunch"], ["tuesday", 12]]);
    });
    test("replaces guest name with guest id", () => {

       const objects = [{
        "guest_name": "Rachel Cummings",
        "propertyName": "Modern Apartment in City Center"
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
      }];


    expect(getFavourites(objects, usersData)).toEqual([[6, "Modern Apartment in City Center" ]]);
    });
    test("replaces property name with property id", () => {

        const objects = [{
         "guest_name": "Rachel Cummings",
         "property_name": 'Bright and Airy Studio'
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
       }];

       const propertiesData = [{
        property_id: 11,
        host_id: 1,
        name: 'Bright and Airy Studio',
        location: 'Cambridge, UK',
        property_type: 'Studio',
        price_per_night: '100',
        description: 'Description of Bright and Airy Studio.'
      }];
 
 
     expect(getFavourites(objects, usersData, propertiesData)).toEqual([[6, 11 ]]);
     });
     test("original data is not mutated", () => {

        const objects = [{
            "guest_name": "Rachel Cummings",
            "property_name": 'Bright and Airy Studio'
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
          }];
   
          const propertiesData = [{
           property_id: 11,
           host_id: 1,
           name: 'Bright and Airy Studio',
           location: 'Cambridge, UK',
           property_type: 'Studio',
           price_per_night: '100',
           description: 'Description of Bright and Airy Studio.'
         }];

    getFavourites(objects, usersData, propertiesData);

    expect(objects).toEqual([{
        "guest_name": "Rachel Cummings",
        "property_name": 'Bright and Airy Studio'
      }]);
     });
});