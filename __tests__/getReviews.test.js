const getReviews = require("../utils/getReviews");

describe("get reviews", () => {
    test("returns an array", () => {

        const objects = [{food : "pizza"}];

    expect(Array.isArray(getReviews(objects))).toBe(true);
    });
    test("returns the value of one object in an array", () => {

        const objects = [{food : "pizza"}];

    expect(getReviews(objects)).toEqual([["pizza"]]);
    });
    test("returns multiple values of one object in an array", () => {

        const objects = [{
                          food: "pizza",
                          meal : "lunch"
                                        }];

    expect(getReviews(objects)).toEqual([["pizza", "lunch"]]);
    });
    test("returns  values of multiple objects in an array", () => {

        const objects = [{
                        food: "pizza",
                        meal : "lunch"},
                       {number : 12,
                        day: "monday"
                        }];

    expect(getReviews(objects)).toEqual([["pizza", "lunch"], [12, "monday"]]);
    });
    test("replaces property name with property id", () => {

        const objects = [{
            property_name: "Bright and Airy Studio",
            meal : "lunch"},
           {number : 12,
            day: "monday"
            }];

        const propertyData = [{
            property_id: 11,
            host_id: 1,
            name: 'Bright and Airy Studio',
            location: 'Cambridge, UK',
            property_type: 'Studio',
            price_per_night: '100',
            description: 'Description of Bright and Airy Studio.'
          }];

    expect(getReviews(objects, propertyData)).toEqual([[11, "lunch"], [12, "monday"]])
    });
    test ("replaces guest name with guest id", () => {


        const objects = [{
            property_name: "Bright and Airy Studio",
            guest_name : "Frank White"},
           {number : 12,
            day: "monday"
            }];

        const propertyData = [{
            property_id: 11,
            host_id: 1,
            name: 'Bright and Airy Studio',
            location: 'Cambridge, UK',
            property_type: 'Studio',
            price_per_night: '100',
            description: 'Description of Bright and Airy Studio.'
          }];

        const userData = [{
            user_id: 4,
            first_name: 'Frank',
            surname: 'White',
            email: 'frank@example.com',
            phone_number: '+44 7000 444444',
            is_host: false,
            avatar: 'https://example.com/images/frank.jpg',
            created_at: null
          }]
    expect(getReviews(objects, propertyData, userData)).toEqual([[11, 4], [12, "monday"]])
    
    });
    test("returns the data in the requested format (property_id/guest_id/rating/comment)", () => {

        const objects = [{
            "guest_name": "Frank White",
            "property_name": "Bright and Airy Studio",
            "rating": 4,
            "comment": "Comment about Chic Studio Near the Beach: Great location and cosy space, perfect for a beach getaway."
          }]

          const propertyData = [{
            property_id: 11,
            host_id: 1,
            name: 'Bright and Airy Studio',
            location: 'Cambridge, UK',
            property_type: 'Studio',
            price_per_night: '100',
            description: 'Description of Bright and Airy Studio.'
          }];

        const userData = [{
            user_id: 4,
            first_name: 'Frank',
            surname: 'White',
            email: 'frank@example.com',
            phone_number: '+44 7000 444444',
            is_host: false,
            avatar: 'https://example.com/images/frank.jpg',
            created_at: null
          }]
        
    expect(getReviews(objects, propertyData, userData)).toEqual([[11, 4, 4, "Comment about Chic Studio Near the Beach: Great location and cosy space, perfect for a beach getaway." ]])
    });
    test("does not mutate original data", () => {

        const objects = [{
            "guest_name": "Frank White",
            "property_name": "Bright and Airy Studio",
            "rating": 4,
            "comment": "Comment about Chic Studio Near the Beach: Great location and cosy space, perfect for a beach getaway."
          }]

          const propertyData = [{
            property_id: 11,
            host_id: 1,
            name: 'Bright and Airy Studio',
            location: 'Cambridge, UK',
            property_type: 'Studio',
            price_per_night: '100',
            description: 'Description of Bright and Airy Studio.'
          }];

        const userData = [{
            user_id: 4,
            first_name: 'Frank',
            surname: 'White',
            email: 'frank@example.com',
            phone_number: '+44 7000 444444',
            is_host: false,
            avatar: 'https://example.com/images/frank.jpg',
            created_at: null
          }]

     getReviews(objects, propertyData, userData)

    expect(objects).toEqual([{
        "guest_name": "Frank White",
        "property_name": "Bright and Airy Studio",
        "rating": 4,
        "comment": "Comment about Chic Studio Near the Beach: Great location and cosy space, perfect for a beach getaway."
      }]);
    });
});