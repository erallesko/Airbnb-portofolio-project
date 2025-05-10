const getImages = require("../utils/getImages");

describe("get images function", () => {
    test("returns an array", () => {

        const objects = [{food : "pizza"}];

    expect(Array.isArray(getImages(objects))).toBe(true);
    });
    test("returns the value of an object in an array", () => {

        const objects = [{food : "pizza"}];

    expect(getImages(objects)).toEqual([["pizza"]])
    });
    test("returns multiple values of an object in an array", () => {

        const objects = [{
                        food:"pizza",
                        meal: "lunch"
        }];

    expect(getImages(objects)).toEqual([["pizza", "lunch"]]);
    });
    test("returns multiple values from multiple objects in an array", () => {

        const objects = [{
                        food: "pizza",
                        meal: "lunch"
                        },{
                        day: "tuesday",
                        time: 12
                        }];
    
    expect(getImages(objects)).toEqual([["pizza", "lunch"], ["tuesday", 12]]);
    });
    test("replaces property name with property id", () => {

        const objects = [{
            property_name: 'Bright and Airy Studio',
            meal: "lunch"
            },{
            day: "tuesday",
            time: 12
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

    expect(getImages(objects, propertyData)).toEqual([[11, "lunch"], ["tuesday", 12]]);
    });
    test("data comse back in correct form (property_id/image_url/alt_text)", () => {

        const objects = [{
            "property_name": "Modern Apartment in City Center",
            "image_url": "https://example.com/images/modern_apartment_1.jpg",
            "alt_tag": "Alt tag for Modern Apartment in City Center"
          }];

        const propertyData = [{
            property_id: 11,
            host_id: 1,
            name: "Modern Apartment in City Center",
            location: 'Cambridge, UK',
            property_type: 'Studio',
            price_per_night: '100',
            description: 'Description of Bright and Airy Studio.'
          }];
    
    expect(getImages(objects, propertyData)).toEqual([[11, "https://example.com/images/modern_apartment_1.jpg", "Alt tag for Modern Apartment in City Center" ]])
    });
    test("original data is not mutated", () => {

        const objects = [{
            "property_name": "Modern Apartment in City Center",
            "image_url": "https://example.com/images/modern_apartment_1.jpg",
            "alt_tag": "Alt tag for Modern Apartment in City Center"
          }];

        const propertyData = [{
            property_id: 11,
            host_id: 1,
            name: "Modern Apartment in City Center",
            location: 'Cambridge, UK',
            property_type: 'Studio',
            price_per_night: '100',
            description: 'Description of Bright and Airy Studio.'
          }];
    
    getImages(objects,  propertyData);

    expect(objects).toEqual([{
        "property_name": "Modern Apartment in City Center",
        "image_url": "https://example.com/images/modern_apartment_1.jpg",
        "alt_tag": "Alt tag for Modern Apartment in City Center"
      }]);
    });
});