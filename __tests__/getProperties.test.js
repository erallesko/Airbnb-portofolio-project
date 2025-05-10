const getProperties = require("../utils/getProperties");

describe("get properties", () => {
    test("returns an array", () => {

        const objects = [{name: "pizza"}];

        const userData = [{
            user_id: 6,
            first_name: 'Rachel',
            surname: 'Cummings',
            email: 'rachel@example.com',
            phone_number: '+44 7000 666666',
            is_host: false,
            avatar: 'https://example.com/images/rachel.jpg',
            created_at: null
          }]

    expect(Array.isArray(getProperties(objects, userData))).toBe(true);
    });
    test("returns value of one object in an array", () => {

        const objects = [{food: "pizza"}];

        const userData = [{
            user_id: 6,
            first_name: 'Rachel',
            surname: 'Cummings',
            email: 'rachel@example.com',
            phone_number: '+44 7000 666666',
            is_host: false,
            avatar: 'https://example.com/images/rachel.jpg',
            created_at: null
          }]

    expect(getProperties(objects, userData)).toEqual([["pizza"]]);
    });
    test("returns multiple values of one object in an array", () => {

        const objects = [{food: "pizza",
                        meal : "lunch"
        }];

        const userData = [{
            user_id: 6,
            first_name: 'Rachel',
            surname: 'Cummings',
            email: 'rachel@example.com',
            phone_number: '+44 7000 666666',
            is_host: false,
            avatar: 'https://example.com/images/rachel.jpg',
            created_at: null
          }]

    expect(getProperties(objects, userData)).toEqual([["pizza", "lunch"]]);
    });
    test("returns  values of multiple objects in an array", () => {

        const objects = [{food: "pizza",
                        meal : "lunch"},
                        {number : 12,
                            day: "monday"
                        }];

        const userData = [{
            user_id: 6,
            first_name: 'Rachel',
            surname: 'Cummings',
            email: 'rachel@example.com',
            phone_number: '+44 7000 666666',
            is_host: false,
            avatar: 'https://example.com/images/rachel.jpg',
            created_at: null
          }]

    expect(getProperties(objects, userData)).toEqual([["pizza", "lunch"], [12, "monday"]]);
    });
    test("does not return amenities key", () => {

        const objects = [{food: "pizza",
                        meal : "lunch"},
                        {number : 12,
                            amenities: "[Wi-fi]"
                        }];
        
        const userData = [{
            user_id: 6,
            first_name: 'Rachel',
            surname: 'Cummings',
            email: 'rachel@example.com',
            phone_number: '+44 7000 666666',
            is_host: false,
            avatar: 'https://example.com/images/rachel.jpg',
            created_at: null
          }]

    expect(getProperties(objects, userData)).toEqual([["pizza", "lunch"], [12]]);
    });
    test("replaces host_id for host name", () => {

        const objects = [{host_name: "Rachel Cummings",
                          name : "lunch"},
                        { number : 12,
                          amenities: "[Wi-fi]"
                        }];

        const userData = [{
            user_id: 6,
            first_name: 'Rachel',
            surname: 'Cummings',
            email: 'rachel@example.com',
            phone_number: '+44 7000 666666',
            is_host: false,
            avatar: 'https://example.com/images/rachel.jpg',
            created_at: null
          }]               

    expect(getProperties(objects, userData)).toEqual([[6, "lunch"], [12]]);
    });
    test("does not mutate the original data", () => {

        const objects = [
            {
                "name": "Cosy Loft in the Heart of the City",
                "property_type": "Apartment",
                "location": "Manchester, UK",
                "price_per_night": 130.0,
                "description": "Description of Cosy Loft in the Heart of the City.",
                "host_name": "Isabella Martinez",
                "amenities": ["WiFi", "Kitchen", "TV"]
              },
              {
                "name": "Quaint Cottage in the Hills",
                "property_type": "House",
                "location": "Lake District, UK",
                "price_per_night": 180.0,
                "description": "Description of Quaint Cottage in the Hills.",
                "host_name": "Isabella Martinez",
                "amenities": ["Washer", "Parking", "WiFi"]
              }
        ];

        const userData = [
            {
              user_id: 1,
              first_name: 'Alice',
              surname: 'Johnson',
              email: 'alice@example.com',
              phone_number: '+44 7000 111111',
              is_host: true,
              avatar: 'https://example.com/images/alice.jpg',
              created_at: null
            },
            {
              user_id: 2,
              first_name: 'Bob',
              surname: 'Smith',
              email: 'bob@example.com',
              phone_number: '+44 7000 222222',
              is_host: false,
              avatar: 'https://example.com/images/bob.jpg',
              created_at: null
            },
            {
              user_id: 3,
              first_name: 'Emma',
              surname: 'Davis',
              email: 'emma@example.com',
              phone_number: '+44 7000 333333',
              is_host: true,
              avatar: 'https://example.com/images/emma.jpg',
              created_at: null
            },
            {
              user_id: 4,
              first_name: 'Frank',
              surname: 'White',
              email: 'frank@example.com',
              phone_number: '+44 7000 444444',
              is_host: false,
              avatar: 'https://example.com/images/frank.jpg',
              created_at: null
            },
            {
              user_id: 5,
              first_name: 'Isabella',
              surname: 'Martinez',
              email: 'isabella@example.com',
              phone_number: '+44 7000 555555',
              is_host: true,
              avatar: 'https://example.com/images/isabella.jpg',
              created_at: null
            },
            {
              user_id: 6,
              first_name: 'Rachel',
              surname: 'Cummings',
              email: 'rachel@example.com',
              phone_number: '+44 7000 666666',
              is_host: false,
              avatar: 'https://example.com/images/rachel.jpg',
              created_at: null
            }
          ]

        getProperties(objects, userData);

    expect(objects).toEqual([
        {
            "name": "Cosy Loft in the Heart of the City",
            "property_type": "Apartment",
            "location": "Manchester, UK",
            "price_per_night": 130.0,
            "description": "Description of Cosy Loft in the Heart of the City.",
            "host_name": "Isabella Martinez",
            "amenities": ["WiFi", "Kitchen", "TV"]
          },
          {
            "name": "Quaint Cottage in the Hills",
            "property_type": "House",
            "location": "Lake District, UK",
            "price_per_night": 180.0,
            "description": "Description of Quaint Cottage in the Hills.",
            "host_name": "Isabella Martinez",
            "amenities": ["Washer", "Parking", "WiFi"]
          }
    ]);
    });

});












