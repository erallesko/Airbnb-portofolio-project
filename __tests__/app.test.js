const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seed");
const {bookingsData, favouritesData, imagesData, reviewsData, propertiesData, propertyTypesData, usersData} = require("../db/data/test/")


afterAll(async () => {
    await seed(propertyTypesData, usersData, propertiesData, reviewsData, imagesData, favouritesData, bookingsData).then(()=>{
        db.end()
    })
})


describe ("app", () => {
    describe ("get request at /api/properties", () => {
        test("responds with Status 200", async () => {

          await  request(app).get("/api/properties").expect(200);
        });
        test( "returns an array of more than 0 elements", async () => {

            const {body} = await  request(app).get("/api/properties");

            expect(Array.isArray(body.properties)).toBe(true);
            expect(body.properties.length > 0).toBe(true);
        });
        test("returns an array of properties that have property_id value", async () => {
           
            const {body} = await request(app).get("/api/properties");

            expect(Array.isArray(body.properties)).toBe(true);
            
            body.properties.forEach(property => {
                expect(property.hasOwnProperty("property_id")).toBe(true);
            });
        });
        test("returns an array of properties that have property_name value", async () => {
           
            const {body} = await request(app).get("/api/properties");

            
            body.properties.forEach(property => {
                expect(property.hasOwnProperty("property_id")).toBe(true);
                expect(property.hasOwnProperty("property_name")).toBe(true);

            });
        });
        test("returns an array of properties that have location value", async () => {
           
            const {body} = await request(app).get("/api/properties");

            
            body.properties.forEach(property => {
                expect(property.hasOwnProperty("property_id")).toBe(true);
                expect(property.hasOwnProperty("property_name")).toBe(true);
                expect(property.hasOwnProperty("location")).toBe(true);

            });
        });
        test("returns an array of properties that have price_per_night value", async () => {
           
            const {body} = await request(app).get("/api/properties");

            
            body.properties.forEach(property => {
                expect(property.hasOwnProperty("property_id")).toBe(true);
                expect(property.hasOwnProperty("property_name")).toBe(true);
                expect(property.hasOwnProperty("location")).toBe(true);
                expect(property.hasOwnProperty("price_per_night")).toBe(true);

            });
        });
        test("returns an array of properties that have host value", async () => {
           
            const {body} = await request(app).get("/api/properties");

            
            body.properties.forEach(property => {
                expect(property.hasOwnProperty("property_id")).toBe(true);
                expect(property.hasOwnProperty("property_name")).toBe(true);
                expect(property.hasOwnProperty("location")).toBe(true);
                expect(property.hasOwnProperty("price_per_night")).toBe(true);
                expect(property.hasOwnProperty("host")).toBe(true);

            }); 
        });
        test("Properties should come back ordered by most favourited to least by default", async () => {
           
            const {body} = await request(app).get("/api/properties");

            expect(body.properties[0].property_name).toBe("Chic Studio Near the Beach")
            expect(body.properties[1].property_name).toBe("Cosy Loft in the Heart of the City")

        });
        test ("non existent endpoint responds with 404 and msg", async () => {

            const  {body} = await request(app).get("/non-existent-path").expect(404)

            expect(body.msg).toBe("Path not found.");
        });
        test("returns an array of properties that have image value", async () => {
           
            const {body} = await request(app).get("/api/properties");

            
            body.properties.forEach(property => {
                expect(property.hasOwnProperty("property_id")).toBe(true);
                expect(property.hasOwnProperty("property_name")).toBe(true);
                expect(property.hasOwnProperty("location")).toBe(true);
                expect(property.hasOwnProperty("price_per_night")).toBe(true);
                expect(property.hasOwnProperty("host")).toBe(true);
                expect(property.hasOwnProperty("image")).toBe(true);
            });
        })
    });
    describe ("extra queries for /api/properties", () => {
        test("maximum price per night", async () => {

            const maxPrice = 110;

            const {body} = await  request(app).get(`/api/properties?maxprice=${maxPrice}`);

            const properties = body.properties

            expect(properties.length).toBe(5);
        });
        test("minimum price per night", async () => {

            const minPrice = 110;

            const {body} = await  request(app).get(`/api/properties?minprice=${minPrice}`);

            const properties = body.properties

            expect(properties.length).toBe(7);
        });
        test("sort by cost_per_night", async () => {

            const sortBy = "price_per_night";

            const {body} = await  request(app).get(`/api/properties?sort=${sortBy}`);

            const propertyOne = body.properties[0]

            expect(propertyOne.price_per_night).toBe("250");
        });
        test("sort by ASC / DESC", async () => {

            const sortingOrder = "ASC";

            const {body} = await  request(app).get(`/api/properties?order=${sortingOrder}`);

            const propertyOne = body.properties[0]

            expect(propertyOne.property_name).toBe("Bright and Airy Studio");
        });
        test("sort by specific host_id", async () => {

            const hostID = 1;

            const {body} = await  request(app).get(`/api/properties?host=${hostID}`);

            expect(body.properties.length).toBe(5);
        });
        test("returns 400 and message if maximum price per night is not an integer", async () => {

            const maxPrice = "Palmer Brown";

            const {body} = await  request(app).get(`/api/properties?maxprice=${maxPrice}`);

            expect(body.msg).toBe("Invalid input.");
        });
        test("returns 400 and message if minimum price per night is not an integer", async () => {

            const minPrice = "Palmer Brown";

            const {body} = await  request(app).get(`/api/properties?minprice=${minPrice}`);

            expect(body.msg).toBe("Invalid input.");
        });
        test("returns 400 and msg if sort by is invalid", async () => {

            const sortBy = "Palmer Brown";

            const {body} = await  request(app).get(`/api/properties?sort=${sortBy}`);

            expect(body.msg).toBe("Bad query.");
        });
        test("returns 400 and msg if sorting order is not ASC / DESC", async () => {

            const sortingOrder = 4555;

            const {body} = await  request(app).get(`/api/properties?order=${sortingOrder}`);

            expect(body.msg).toBe("Bad query.");

        });
        test("returns 400 and msg if host_id is not an integer", async () => {

            const hostID = "invalid-id";

            const {body} = await  request(app).get(`/api/properties?host=${hostID}`)
                                  .expect(400);

            expect(body.msg).toBe("Invalid input.");
        });
        test("returns 404 and msg if host_id is not valid", async () => {

            const hostID = 54555;

            const {body} = await  request(app).get(`/api/properties?host=${hostID}`)
                                  .expect(404);

            expect(body.msg).toBe("Invalid input.");
        });
        test("returns properties which have requested amenity", async () => {


            const {body} = await  request(app).get(`/api/properties?amenity=TV`);

            const properties = body.properties

            expect(properties.length).toBe(6);
        });
        test("returns properties which have requested amenities", async () => {


            const {body} = await  request(app).get(`/api/properties?amenity=WiFi&amenity=Kitchen`);

            const properties = body.properties

            expect(properties.length).toBe(3);
        });
        test("returns 404 and msg if amenity is not valid", async () => {


            const {body} = await  request(app).get(`/api/properties?amenity=Sink`).expect(404);

            expect(body.msg).toBe("Invalid input.");
        });
    });
    describe ("get request at /api/properties/:id/reviews", () => {
        test("responds with Status 200", async () => {

            const id = 1;

            await  request(app).get(`/api/properties/${id}/reviews`).expect(200);
          });
        test( "returns an array of more than 0 elements", async () => {

            const id = 1;

            const {body} = await  request(app).get(`/api/properties/${id}/reviews`);

            expect(Array.isArray(body.reviews)).toBe(true);
            expect(body.reviews.length > 0).toBe(true);
        });
        test("returns an array of reviews that have review_id value ", async () => {

            const id = 1;

            const {body} = await  request(app).get(`/api/properties/${id}/reviews`);

            body.reviews.forEach((review)=>{
                expect(review.hasOwnProperty("review_id")).toBe(true);
            });
        });
        test("returns an array of reviews that have comment value", async () => {

            const id = 1;

            const {body} = await  request(app).get(`/api/properties/${id}/reviews`);

            body.reviews.forEach((review)=>{
                expect(review.hasOwnProperty("comment")).toBe(true);
            });
        });
        test("returns an array of reviews that have rating value", async () => {

            const id = 1;

            const {body} = await  request(app).get(`/api/properties/${id}/reviews`);

            body.reviews.forEach((review)=>{
                expect(review.hasOwnProperty("rating")).toBe(true);
            });
        });
        test("returns an array of reviews that have created_at value", async () => {

            const id = 1;

            const {body} = await  request(app).get(`/api/properties/${id}/reviews`);

            body.reviews.forEach((review)=>{
                expect(review.hasOwnProperty("created_at")).toBe(true);
            });
        });
        test("returns an array of reviews that have guest_name value", async () => {

            const id = 1;

            const {body} = await  request(app).get(`/api/properties/${id}/reviews`);

            body.reviews.forEach((review)=>{
                expect(review.hasOwnProperty("guest_name")).toBe(true);
            });
        });
        test("returns an array of reviews that have guest_avatar value", async () => {

            const id = 1;

            const {body} = await  request(app).get(`/api/properties/${id}/reviews`);

            body.reviews.forEach((review)=>{
                expect(review.hasOwnProperty("guest_avatar")).toBe(true);
            });
        });
        test("returns a key of average_rating with a value of average ratings", async () => {

            const id = 1;

            const {body} = await  request(app).get(`/api/properties/${id}/reviews`);

            expect(typeof body.average_rating).toBe("number")
        });
        test("uses the parametric endpont to bring the reviews for that property", async () => {

            const id = 1;

            const query = `/api/properties/${id}/reviews`;

            const {body} = await  request(app).get(query);

            expect(body.reviews.length).toBe(2);

        });
        test("reviews are sorted from oldest to newest", async () => {

            const id = 1;

            const {body} = await  request(app).get(`/api/properties/${id}/reviews`);

            expect(body.reviews).toBeSortedBy("created_at");

        });
        test("returns error 400 and msg if id is not an integer", async () => {

            const  id = "invalid-id";

            const {body} = await  request(app).get(`/api/properties/${id}/reviews`).expect(400);

            expect(body.msg).toBe("Invalid input.")
           
        });
        test("returns error 404 and msg if property id does not exist", async () => {

            const  id = 9999;

            const {body} = await  request(app).get(`/api/properties/${id}/reviews`)
                                  .expect(404);

            expect(body.msg).toBe("Review not found.")
           
        });
    });
    describe ("get request at /api/properties/:id", () => {
        test("responds with Status 200", async () => {

            const id = 2

            await  request(app).get(`/api/properties/${id}`).expect(200);
          });
        test( "returns an array 1 element ", async () => {

          const id = 3

          const {body} =  await  request(app).get(`/api/properties/${id}`);

            expect(Array.isArray(body.property)).toBe(true);

            expect(body.property.length === 1).toBe(true);
        });
        test( "returns a property with the property id passed in the parametric endpoint", async () => {

            const id = 3;
            
            const query = `/api/properties/${id}`;

            const {body} = await request(app).get(query);

            const propertyID = body.property[0].property_id

            expect(propertyID).toBe(id);

        });
        test("returns an array with one property that has a property_name value ", async () => {

            const id = 3;

            const {body} = await  request(app).get(`/api/properties/${id}`);

            const property = body.property[0];

            expect(property.hasOwnProperty("property_name")).toBe(true)
        });
        test("returns an array with one property that has a location value ", async () => {

            const id = 3;

            const {body} = await  request(app).get(`/api/properties/${id}`);

            const property = body.property[0];

            expect(property.hasOwnProperty("location")).toBe(true)
        });
        test("returns an array with one property that has a price_per_night value ", async () => {

            const id = 3;

            const {body} = await  request(app).get(`/api/properties/${id}`);

            const property = body.property[0];

            expect(property.hasOwnProperty("price_per_night")).toBe(true)
        });
        test("returns an array with one property that has a description value ", async () => {

            const id = 3;

            const {body} = await  request(app).get(`/api/properties/${id}`);

            const property = body.property[0];

            expect(property.hasOwnProperty("description")).toBe(true)
        });
        test("returns an array with one property that has a host value ", async () => {

            const id = 3;

            const {body} = await  request(app).get(`/api/properties/${id}`);

            const property = body.property[0];

            expect(property.hasOwnProperty("host")).toBe(true)
        });
        test("returns an array with one property that has a host_avatar value ", async () => {

            const id = 3;

            const {body} = await  request(app).get(`/api/properties/${id}`);

            const property = body.property[0];

            expect(property.hasOwnProperty("host_avatar")).toBe(true)
        });
        test("returns an array with one property that has a favourite_count value ", async () => {

            const id = 3;

            const {body} = await  request(app).get(`/api/properties/${id}`);

            const property = body.property[0];

            expect(property.hasOwnProperty("favourite_count")).toBe(true)
        });
        test("should take an optional query ?user_id=<id> that returns if the property is favourited or not by the user ", async () => {

            const  id = 1
            const userID = 3

            const {body} = await  request(app).get(`/api/properties/${id}?user_id=${userID}`);

            const property = body.property[0];

            expect(property.hasOwnProperty("favourited")).toBe(true);
            expect(typeof property.favourited).toBe("boolean");
        });
        test("returns error 404 and msg if id number doesn't exist", async () => {

            const  id = 8888

            const {body} = await  request(app)
                                  .get(`/api/properties/8888`)
                                  .expect(404)

            expect(body.msg).toBe("Property not found.")
        });
        test("returns error 400 and msg if id is not an integer", async () => {

            const  id = "invalid-data"

            const {body} = await  request(app).get(`/api/properties/${id}`).expect(400);

            expect(body.msg).toBe("Invalid input.")
           
        });
        test("returns error 400 and msg if query is not an integer ", async () => {

            const  id = 1;
            const userID = "invalid-id";

            const {body} = await  request(app)
                                  .get(`/api/properties/${id}?user_id=${userID}`)
                                  .expect(400);

            expect(body.msg).toBe("Invalid input.")

        });   
        test("returns a property with an images value holding all images for that property", async () => {

            const  id = 1;

            const {body} = await  request(app)
                                  .get(`/api/properties/${id}`)
                                  .expect(200);

            const property = body.property[0]

            expect(property.hasOwnProperty("images")).toBe(true);
            expect(property.images.length).toBe(3);

        });   
        test("returns an array with one property that has an amenities value ", async () => {

            const id = 1;

            const {body} = await  request(app).get(`/api/properties/${id}`);

            const property = body.property[0];

            expect(property.hasOwnProperty("amenities")).toBe(true);
            expect(property.amenities).toEqual(["WiFi", "TV", "Kitchen"]);

        });    
    });
    describe ("get request at /api/users/:id", () => {
        test("responds with Status 200", async () => {

            const id = 1;

            await  request(app).get(`/api/users/${id}`).expect(200);

          });
        test("returns an array with one user", async () => {

            const id = 1;

            const {body} =  await request(app).get(`/api/users/${id}`);

            expect(Array.isArray(body.user)).toBe(true);

            expect(body.user[0].length === 1);

        });
        test("returns a user with user_id value", async () => {

            const id = 1;

            const {body} =  await request(app).get(`/api/users/${id}`);

            const user = body.user[0];

            expect(user.hasOwnProperty("user_id")).toBe(true);

        });
        test("returns a user with first_name value", async () => {

            const id = 1;

            const {body} =  await request(app).get(`/api/users/${id}`);

            const user = body.user[0];

            expect(user.hasOwnProperty("first_name")).toBe(true);

        });
        test("returns a user with surname value", async () => {

            const id = 1;

            const {body} =  await request(app).get(`/api/users/${id}`);

            const user = body.user[0];

            expect(user.hasOwnProperty("surname")).toBe(true);

        });
        test("returns a user with email value", async () => {

            const id = 1;

            const {body} =  await request(app).get(`/api/users/${id}`);

            const user = body.user[0];

            expect(user.hasOwnProperty("email")).toBe(true);

        });
        test("returns a user with phone_number value", async () => {

            const id = 1;

            const {body} =  await request(app).get(`/api/users/${id}`);

            const user = body.user[0];

            expect(user.hasOwnProperty("phone_number")).toBe(true);

        });
        test("returns a user with avatar value", async () => {

            const id = 1;

            const {body} =  await request(app).get(`/api/users/${id}`);

            const user = body.user[0];

            expect(user.hasOwnProperty("avatar")).toBe(true);

        });
        test("returns a user with created_at value", async () => {

            const id = 1;

            const {body} =  await request(app).get(`/api/users/${id}`);

            const user = body.user[0];

            expect(user.hasOwnProperty("created_at")).toBe(true);

        });
        test("returns 404 with msg if user doesn't exist", async () => {

            const id = 5555;

            const {body} =  await request(app)
                                  .get(`/api/users/${id}`)
                                  .expect(404);

            expect(body.msg).toBe("User not found.");
        });
        test("returns 400 with msg if id is not an integer", async () => {

            const id = "invalid-id";

            const {body} =  await request(app)
                                  .get(`/api/users/${id}`)
                                  .expect(400);

            expect(body.msg).toBe("Invalid input.");
        });
    });
    describe ("delete request at /api/reviews/id", () => {
        test("responds with Status 204", async () => {

            const id = 4;

           const {body} = await  request(app).delete(`/api/reviews/${id}`)
                               .expect(204);
          });
        test("deletes the reviews corresponding to the parametric endpoint property",async () => {

          const id = 2;

          await  request(app).delete(`/api/reviews/${id}`);

          const {body} = await  request(app).get(`/api/reviews/${id}`)

            expect(body.msg).toBe(undefined);
        });
        test("returns 404 and msg if id number is not accurate",async () => {

            const id = 11111;
  
           const {body} = await  request(app).delete(`/api/reviews/${id}`)
                               .expect(404);
   
              expect(body.msg).toBe("Review not found.");
          });
        test("returns 400 and msg if id not an integer",async () => {

            const id = "invalid-id";
  
           const {body} = await  request(app).delete(`/api/reviews/${id}`)
                                 .expect(400);
   
              expect(body.msg).toBe("Invalid input.");
          });
    });
    describe ("post a review at /api/properties/:id/reviews", () => {
        test("responds with Status 201", async () => {

            const id = 1;

            const data = {
                guest_id: 4,
                rating: 4,
                comment: 'Great location'
            }

            await request(app)
            .post(`/api/properties/${id}/reviews`)
            .send(data)
            .expect(201);

          });
          test("Inserts review into reviews table", async () => {
         
            const id = 1;

            const data = {
                guest_id: 2,
                rating: 4,
                comment: "Great location"
            }

           const {body} = await request(app)
            .post(`/api/properties/${id}/reviews`)
            .send(data)
            .expect(201);

            const {rows} = await db.query(`SELECT * FROM reviews `);

            expect(rows.length).toEqual(11)
          });
          test("returns an object with review_id, property_id, guest_id, rating, comment and created_at values", async () => {
         
            const id = 1;

            const data = {
                guest_id: 2,
                rating: 4,
                comment: "Great location"
            }

           const {body} = await request(app)
            .post(`/api/properties/${id}/reviews`)
            .send(data)
            .expect(201);

            const {rows} = await db.query(`SELECT * FROM reviews `);

            expect(body.hasOwnProperty("review_id")).toEqual(true);
            expect(body.hasOwnProperty("property_id")).toEqual(true);
            expect(body.hasOwnProperty("guest_id")).toEqual(true);
            expect(body.hasOwnProperty("rating")).toEqual(true);
            expect(body.hasOwnProperty("comment")).toEqual(true);
            expect(body.hasOwnProperty("created_at")).toEqual(true);

          });
        test("returns 400 and msg if id is not an integer", async () => {
         
            const id = "invalid-id";

            const data = {
                guest_id: 2,
                rating: 4,
                comment: "Great location"
            }

           const {body} = await request(app)
            .post(`/api/properties/${id}/reviews`)
            .send(data)
            .expect(400);

            expect(body.msg).toEqual("Invalid input.")
          });
        test("returns 404 and msg if id number is not valid", async () => {
         
            const id = 5555;

            const data = {
                guest_id: 2,
                rating: 4,
                comment: "Great location"
            }

           const {body} = await request(app)
            .post(`/api/properties/${id}/reviews`)
            .send(data)
            .expect(404);

            expect(body.msg).toEqual("Property not found.")
          });
        test("returns 400 and msg if missing guest_id ", async () => {
         
            const id = 1;

            const data = {
                rating: 4,
                comment: "Great location"
            }

           const {body} = await request(app)
            .post(`/api/properties/${id}/reviews`)
            .send(data)
            .expect(400);

            expect(body.msg).toEqual("Invalid input.")
          });
        test("returns 400 and msg if missing rating", async () => {
         
            const id = 1;

            const data = {
                guest_id : 1,
                comment: "Great location"
            }

           const {body} = await request(app)
            .post(`/api/properties/${id}/reviews`)
            .send(data)
            .expect(400);

            expect(body.msg).toEqual("Invalid input.")
          });
        test("returns 400 and msg if missing comment", async () => {
         
            const id = 1;

            const data = {
                guest_id : 1,
                rating: 4,
            }

           const {body} = await request(app)
            .post(`/api/properties/${id}/reviews`)
            .send(data)
            .expect(400);

            expect(body.msg).toEqual("Invalid input.")
          });
        test("ignores extra key-value pair", async () => {
         
            const id = 1;

            const data = {
                guest_id: 2,
                rating: 4,
                comment: "Great location",
                avatar: "www.thisisit.com"
            }

           const {body} = await request(app)
            .post(`/api/properties/${id}/reviews`)
            .send(data)
            .expect(201);

            const {rows} = await db.query(`SELECT * FROM reviews `);

            expect(rows.length).toEqual(13)
          });
        test("returns 400 and msg if guest_id is not an integer", async () => {
         
            const id = 1;

            const data = {
                guest_id : "invalid-id",
                rating: 4,
                comment: "Great location"
            }

           const {body} = await request(app)
            .post(`/api/properties/${id}/reviews`)
            .send(data)
            .expect(400);

            expect(body.msg).toEqual("Invalid input.")
          });
        test("returns 400 and msg if rating is not an integer", async () => {
         
            const id = 1;

            const data = {
                guest_id : 1,
                rating: 'invalid-input',
                comment: "Great location"
            }

           const {body} = await request(app)
            .post(`/api/properties/${id}/reviews`)
            .send(data)
            .expect(400);

            expect(body.msg).toEqual("Invalid input.")
          });
        test("returns 400 and msg if comment is not a string", async () => {
         
            const id = 1;

            const data = {
                guest_id : 1,
                rating: 'invalid-input',
                comment: 4562
            }

           const {body} = await request(app)
            .post(`/api/properties/${id}/reviews`)
            .send(data)
            .expect(400);

            expect(body.msg).toEqual("Invalid input.")
          });
    });
    describe ("patch a user at /api/users/:id", () => {
        test("updates first name and returns updated user, responds with 200", async () => {

            const id = 1;

            const passedData = {first_name :'Katie'}

            const updatedUser =  {
                user_id: 1,
                first_name: 'Katie',
                surname: 'Johnson',
                email: 'alice@example.com',
                phone_number: '+44 7000 111111',
                is_host: true,
                avatar: 'https://example.com/images/alice.jpg',
              }

           const {body} =  await  request(app)
                                            .patch(`/api/users/${id}`)
                                            .send(passedData)
                                            .expect(200);

           expect(body.user).toEqual(updatedUser);
          });
        test("updates surname and returns updated user", async () => {

            const id = 1;

            const passedData = {surname :'Perry'}

            const updatedUser =  {
                user_id: 1,
                first_name: 'Katie',
                surname: 'Perry',
                email: 'alice@example.com',
                phone_number: '+44 7000 111111',
                is_host: true,
                avatar: 'https://example.com/images/alice.jpg',
              }

           const {body} =  await  request(app)
                                            .patch(`/api/users/${id}`)
                                            .send(passedData)
                                            .expect(200);

           expect(body.user).toEqual(updatedUser);
          });
        test("updates surname and returns updated user", async () => {

            const id = 1;

            const passedData = {email :'katie@example.com'}

            const updatedUser =  {
                user_id: 1,
                first_name: 'Katie',
                surname: 'Perry',
                email: 'katie@example.com',
                phone_number: '+44 7000 111111',
                is_host: true,
                avatar: 'https://example.com/images/alice.jpg',
              }

           const {body} =  await  request(app)
                                            .patch(`/api/users/${id}`)
                                            .send(passedData)
                                            .expect(200);

           expect(body.user).toEqual(updatedUser);
          });
        test("updates surname and returns updated user", async () => {

            const id = 1;

            const passedData = {phone_number :'+44 7000 222222'}

            const updatedUser =  {
                user_id: 1,
                first_name: 'Katie',
                surname: 'Perry',
                email: 'katie@example.com',
                phone_number: '+44 7000 222222',
                is_host: true,
                avatar: 'https://example.com/images/alice.jpg',
              }

           const {body} =  await  request(app)
                                            .patch(`/api/users/${id}`)
                                            .send(passedData)
                                            .expect(200);

           expect(body.user).toEqual(updatedUser);
          });
        test("updates avatar and returns updated user", async () => {

            const id = 1;

            const passedData = {avatar :'https://example.com/images/katie.jpg'}

            const updatedUser =  {
                user_id: 1,
                first_name: 'Katie',
                surname: 'Perry',
                email: 'katie@example.com',
                phone_number: '+44 7000 222222',
                is_host: true,
                avatar: 'https://example.com/images/katie.jpg',
              }

           const {body} =  await  request(app)
                                            .patch(`/api/users/${id}`)
                                            .send(passedData)
                                            .expect(200);

           expect(body.user).toEqual(updatedUser);
          });
        test("updates any combination of values and returns updated user", async () => {

            const id = 1;

            const passedData = {first_name: 'John',
                                phone_number: '+44 7333 222222',
                                avatar :'https://example.com/images/john.jpg'
                            }

            const updatedUser =  {
                user_id: 1,
                first_name: 'John',
                surname: 'Perry',
                email: 'katie@example.com',
                phone_number: '+44 7333 222222',
                is_host: true,
                avatar: 'https://example.com/images/john.jpg',
              }

           const {body} =  await  request(app)
                                            .patch(`/api/users/${id}`)
                                            .send(passedData)
                                            .expect(200);

           expect(body.user).toEqual(updatedUser);
          });
        test("returns 404 and msg if user id is not valid", async () => {

            const id = 5555;

            const passedData = {first_name: 'John',
                phone_number: '+44 7333 222222',
                avatar :'https://example.com/images/john.jpg'
            }

            const {body} = await request(app).patch(`/api/users/${id}`)
                                             .send(passedData)
                                             .expect(404)

            expect(body.msg).toBe("User not found.");
        });
        test("returns 400 and msg if user id is an integer", async () => {

            const id = "invalid-id";

            const passedData = {first_name: 'John',
                phone_number: '+44 7333 222222',
                avatar :'https://example.com/images/john.jpg'
            }

            const {body} = await request(app).patch(`/api/users/${id}`)
                                             .send(passedData)
                                             .expect(400)

            expect(body.msg).toBe("Invalid input.");
        });
        test("returns 400 and msg if first name is not a string", async () => {

            const id = 1;

            const passedData = {first_name : 2341}

           const {body} =  await  request(app)
                                            .patch(`/api/users/${id}`)
                                            .send(passedData)
                                            .expect(400);

            expect(body.msg).toBe("Bad request.");
          });
        test("returns 400 and msg if surname is not a string", async () => {

            const id = 1;

            const passedData = {surname : 2341}

           const {body} =  await  request(app)
                                            .patch(`/api/users/${id}`)
                                            .send(passedData)
                                            .expect(400);

            expect(body.msg).toBe("Bad request.");
          });
        test("returns 400 and msg if email is not in the correct form", async () => {

            const id = 1;

            const passedData = {email : "abc.email.com"}

           const {body} =  await  request(app)
                                            .patch(`/api/users/${id}`)
                                            .send(passedData)
                                            .expect(400);

            expect(body.msg).toBe("Bad request.");
          });
        test("returns 400 and msg if phone number is not in the correct form", async () => {

            const id = 1;
''
            const passedData = {phone_number : "+44 654 54234"}

           const {body} =  await  request(app)
                                            .patch(`/api/users/${id}`)
                                            .send(passedData)
                                            .expect(400);

            expect(body.msg).toBe("Bad request.");
          });
        test("returns 400 and msg if avatar is in the correct form", async () => {

            const id = 1;
''
            const passedData = {avatar : "ww.example.com"}

           const {body} =  await  request(app)
                                            .patch(`/api/users/${id}`)
                                            .send(passedData)
                                            .expect(400);

            expect(body.msg).toBe("Bad request.");
          });
    });
    describe ("delete request at /api/properties/:id/favourite", () => {
        test ("responds with status 204 and returns no body", async () => {

            const id = 2;

            await  request(app).delete(`/api/properties/${id}/favourite`).expect(204);
                              
        });
        test ("responds with status 404 and msg if id does not exist", async () => {

            const id = 6666;

            const {body} = await  request(app).delete(`/api/properties/${id}/favourite`)
                                  .expect(404);

             expect(body.msg).toBe("Property not found.")                 
        });
        test ("responds with status 400 and msg if id is not valid", async () => {

            const id = "invalid-id";

            const {body} = await  request(app).delete(`/api/properties/${id}/favourite`)
                                  .expect(400);

             expect(body.msg).toBe("Invalid input.")                 
        });
    });
    describe ("post request at /api/properties/:id/favourite", () => {
        test("returns status 201", async () => {

            const id = 2;

            const userData = {
                "guest_id": 4
            };

            const {body} = await request(app).post(`/api/properties/${id}/favourite`)
                                             .send(userData)
                                             .expect(201);
        });
        test("inserts new row into favourites table", async () => {

            const id = 2;

            const userData = {
                "guest_id": 4
            };

             await request(app).post(`/api/properties/${id}/favourite`)
                                             .send(userData);
            
            const {rows} = await db.query(`SELECT favourite_id FROM favourites`);

            expect(rows.length).toBe(19);
        });
        test("returns message and favourite id number in a JSON", async () => {

            const id = 2;

            const userData = {
                "guest_id": 4
            };

            const {body} = await request(app).post(`/api/properties/${id}/favourite`)
                                             .send(userData);
            
            expect(body.msg).toBe("Property favourited successfully.");
            expect(body.favourite_id).toBe(22);
        });
        test("returns 400 and msg if id is not a valid property", async () => {

            const id = 5555;

            const userData = {
                "guest_id": 4
            };

            const {body} = await request(app).post(`/api/properties/${id}/favourite`)
                                             .send(userData)
                                             .expect(400);
            
            expect(body.msg).toBe("Invalid input.");
        });
        test("returns 400 and msg if id is not an integer", async () => {

            const id = "invalid-id";

            const userData = {
                "guest_id": 4
            };

            const {body} = await request(app).post(`/api/properties/${id}/favourite`)
                                             .send(userData)
                                             .expect(400);
            
            expect(body.msg).toBe("Invalid input.");
        });
        test("returns 400 and msg if guest_id doesn't exist", async () => {

            const id = 3;

            const userData = {
                "invalid_key": 4
            };

            const {body} = await request(app).post(`/api/properties/${id}/favourite`)
                                             .send(userData)
                                             .expect(400);
            
            expect(body.msg).toBe("Invalid input.");
        });
        test("returns 400 and msg if guest_id is not an integer", async () => {

            const id = 3;

            const userData = {
                "guest_id": "invalid-id"
            };

            const {body} = await request(app).post(`/api/properties/${id}/favourite`)
                                             .send(userData)
                                             .expect(400);
            
            expect(body.msg).toBe("Invalid input.");
        });
        test("returns 201 and not affected if extra key exists", async () => {

            const id = 3;

            const userData = {
                "guest_id": 3,
                "guest_car": true
            };

            const {body} = await request(app).post(`/api/properties/${id}/favourite`)
                                             .send(userData)
                                             .expect(201);
            
        });
    });
    describe ("get request at /api/properties/:id/bookings", () => {
        test("returns status 200", async () => {

            const id = 2;

            await request(app).get(`/api/properties/${id}/bookings`)
                              .expect(200);
        });
        test("returns an array of bookings that have a booking_id value", async () => {

            const id = 2;

            const  {body} = await request(app).get(`/api/properties/${id}/bookings`)
                              .expect(200);
            
            expect(body.bookings[0].hasOwnProperty("booking_id")).toBe(true);
        });
        test("returns an array of bookings that have a check_in_date value", async () => {

            const id = 2;

            const  {body} = await request(app).get(`/api/properties/${id}/bookings`)
                              .expect(200);
            
            expect(body.bookings[0].hasOwnProperty("booking_id")).toBe(true);
            expect(body.bookings[0].hasOwnProperty("check_in_date")).toBe(true);

        });
        test("returns an array of bookings that have a check_out_date value", async () => {
            
            const id = 2;

            const  {body} = await request(app).get(`/api/properties/${id}/bookings`)
                              .expect(200);
            
            expect(body.bookings[0].hasOwnProperty("booking_id")).toBe(true);
            expect(body.bookings[0].hasOwnProperty("check_out_date")).toBe(true);

        });
        test("returns an array of bookings that have a created_at value", async () => {

            const id = 2;

            const  {body} = await request(app).get(`/api/properties/${id}/bookings`)
                              .expect(200);
            
            expect(body.bookings[0].hasOwnProperty("booking_id")).toBe(true);
            expect(body.bookings[0].hasOwnProperty("check_out_date")).toBe(true);
            expect(body.bookings[0].hasOwnProperty("created_at")).toBe(true);

        });
        test("returns an extra key of property_id with the number in", async () => {

            const id = 2;

            const  {body} = await request(app).get(`/api/properties/${id}/bookings`)
                              .expect(200);
            
            expect(body.property_id).toBe(id);

        });
        test("bookings are ordered from latest check_out_date to earliest", async () => {

            const id = 1;

            const  {body} = await request(app).get(`/api/properties/${id}/bookings`)
                              .expect(200);


            expect(body.bookings).toBeSortedBy("check_out_date", {descending: true});

        });
        test("returns status 400 and msg if id does not exist", async () => {

            const id = 14444;

            const  {body} = await request(app).get(`/api/properties/${id}/bookings`)
                                              .expect(400);

            expect(body.msg).toBe("Property not found.");
        });
        test("returns status 400 and msg if id is not an integer", async () => {

            const id = "invalid-id";

            const  {body} = await request(app).get(`/api/properties/${id}/bookings`)
                                              .expect(400);

            expect(body.msg).toBe("Invalid input.");
        });
    });
    describe ("delete request at /api/bookings/:id", () => {
        test("returns status 204 and no body", async () => {

            const id = 2;

            const {body} = await request(app).delete(`/api/bookings/${id}`)
                                           .expect(204);
                expect(body).toEqual({})                           
        });
        test("removes the requested booking", async () => {

            const id = 1;

            const {body} = await request(app).delete(`/api/bookings/${id}`)
                                           .expect(204);

            const {rows} = await db.query(`SELECT * FROM bookings 
                                           WHERE booking_id = ${id} `);
            expect(rows).toEqual([]);
        });
        test ("responds with status 404 and msg if id does not exist", async () => {

            const id = 6666;

            const {body} = await  request(app).delete(`/api/bookings/${id}`)
                                  .expect(404);

             expect(body.msg).toBe("Property not found.")                 
        });
        test ("responds with status 400 and msg if id is not valid", async () => {

            const id = "invalid-id";

            const {body} = await  request(app).delete(`/api/bookings/${id}`)
                                  .expect(400);

             expect(body.msg).toBe("Invalid input.")                 
        });
    });
    describe ("get request at /api/users/:id/bookings", () => {
        test("returns status 200", async () => {

            const id = 2;

            await request(app).get(`/api/users/${id}/bookings`)
                              .expect(200);
        });
        test("returns an array of more than 0 elements", async () => {

            const id = 2;

           const {body} =  await request(app).get(`/api/users/${id}/bookings`);
           
           const bookings = body.bookings;

           expect(bookings.length > 0).toBe(true);
        });
        test("returns an array of bookings that have a booking_id value", async () => {

            const id = 2;

           const {body} =  await request(app).get(`/api/users/${id}/bookings`);
           
           const booking = body.bookings[0];

           expect(booking.hasOwnProperty("booking_id")).toBe(true);
        });
        test("returns an array of bookings that have a check_in_date value", async () => {

            const id = 2;

           const {body} =  await request(app).get(`/api/users/${id}/bookings`);
           
           const booking = body.bookings[0];

           expect(booking.hasOwnProperty("check_in_date")).toBe(true);
        });
        test("returns an array of bookings that have a check_out_date value", async () => {

            const id = 2;

           const {body} =  await request(app).get(`/api/users/${id}/bookings`);
           
           const booking = body.bookings[0];

           expect(booking.hasOwnProperty("check_out_date")).toBe(true);
        });
        test("returns an array of bookings that have a property id value", async () => {

            const id = 2;

           const {body} =  await request(app).get(`/api/users/${id}/bookings`);
           
           const booking = body.bookings[0];

           expect(booking.hasOwnProperty("property_id")).toBe(true);
        });
        test("returns an array of bookings that have a property name value", async () => {

            const id = 2;

           const {body} =  await request(app).get(`/api/users/${id}/bookings`);
           
           const booking = body.bookings[0];

           expect(booking.hasOwnProperty("property_name")).toBe(true);
        });
        test("returns an array of bookings that have a host value", async () => {

            const id = 2;

           const {body} =  await request(app).get(`/api/users/${id}/bookings`);
           
           const booking = body.bookings[0];

           expect(booking.hasOwnProperty("host")).toBe(true);
        });
        test("returns an array of bookings that has an image value", async () => {

            const id = 2;

           const {body} =  await request(app).get(`/api/users/${id}/bookings`);
           
           const booking = body.bookings[0];

           expect(booking.hasOwnProperty("image")).toBe(true);
        });
        test("bookings come back sorted in chronological order", async () => {

            const id = 2;

           const {body} =  await request(app).get(`/api/users/${id}/bookings`);
           
           const bookings = body.bookings

           expect(bookings).toBeSortedBy('check_in_date');
        });
        test("returns 400 and msg if id is not an integer", async () => {

            const id = "invalid-input";

           const {body} =  await request(app).get(`/api/users/${id}/bookings`)
                                             .expect(400);
                                             
           expect(body.msg).toBe("Invalid input.");
        });
        test("returns 404 and msg if id is not valid user", async () => {

            const id = 5555;

           const {body} =  await request(app).get(`/api/users/${id}/bookings`)
                                             .expect(404);
                                             
           expect(body.msg).toBe("User not found.");
        });
    })
});