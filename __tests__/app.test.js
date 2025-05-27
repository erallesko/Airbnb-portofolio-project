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
        test ("non existent endpoint responds with 404 and msg", async () => {

            const  {body} = await request(app).get("/non-existent-path").expect(404)

            expect(body.msg).toBe("Path not found.");
        });
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

            expect(propertyOne.price_per_night).toBe("85");
        });
        test("sort by ASC / DESC", async () => {

            const sortingOrder = "DESC";

            const {body} = await  request(app).get(`/api/properties?order=${sortingOrder}`);

            const propertyOne = body.properties[0]

            expect(propertyOne.price_per_night).toBe("250");
        });
        test("sort by specific host_id", async () => {

            const hostID = 1;

            const {body} = await  request(app).get(`/api/properties?host=${hostID}`);

            expect(body.properties.length).toBe(5);
        });
    });
    describe ("get request at /api/properties/:id/reviews", () => {
        test("responds with Status 200", async () => {

            await  request(app).get("/api/properties/:id/reviews").expect(200);
          });
        test( "returns an array of more than 0 elements", async () => {

            const {body} = await  request(app).get("/api/properties/:id/reviews");

            expect(Array.isArray(body.reviews)).toBe(true);
            expect(body.reviews.length > 0).toBe(true);
        });
        test("returns an array of reviews that have review_id value ", async () => {

            const {body} = await  request(app).get("/api/properties/:id/reviews");

            body.reviews.forEach((review)=>{
                expect(review.hasOwnProperty("review_id")).toBe(true);
            });
        });
        test("returns an array of reviews that have comment value", async () => {

            const {body} = await  request(app).get("/api/properties/:id/reviews");

            body.reviews.forEach((review)=>{
                expect(review.hasOwnProperty("comment")).toBe(true);
            });
        });
        test("returns an array of reviews that have rating value", async () => {

            const {body} = await  request(app).get("/api/properties/:id/reviews");

            body.reviews.forEach((review)=>{
                expect(review.hasOwnProperty("rating")).toBe(true);
            });
        });
        test("returns an array of reviews that have created_at value", async () => {

            const {body} = await  request(app).get("/api/properties/:id/reviews");

            body.reviews.forEach((review)=>{
                expect(review.hasOwnProperty("created_at")).toBe(true);
            });
        });
        test("returns an array of reviews that have guest_name value", async () => {

            const {body} = await  request(app).get("/api/properties/:id/reviews");

            body.reviews.forEach((review)=>{
                expect(review.hasOwnProperty("guest_name")).toBe(true);
            });
        });
        test("returns an array of reviews that have guest_avatar value", async () => {

            const {body} = await  request(app).get("/api/properties/:id/reviews");

            body.reviews.forEach((review)=>{
                expect(review.hasOwnProperty("guest_avatar")).toBe(true);
            });
        });
        test("returns a key of average_rating with a value of average ratings", async () => {

            const {body} = await  request(app).get("/api/properties/:id/reviews");

            expect(typeof body.average_rating).toBe("number")
        });
        test("uses the parametric endpont to bring the reviews for that property", async () => {

            const id = 1;

            const query = `/api/properties/${id}/reviews`;

            const {body} = await  request(app).get(query);

            expect(body.reviews.length).toBe(2);

        });
        // test("reviews are sorted from oldest to newest", async () => {

        //     const {body} = await  request(app).get("/api/properties/:id/reviews");


        //     expect([1, 2, 4, 6]).toBeSorted();

        // })
    });
    describe ("get request at /api/properties/:id", () => {
        test("responds with Status 200", async () => {

            await  request(app).get("/api/properties/:id").expect(200);
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
    });
    describe ("delete request at /api/properties/:id/reviews", () => {
        test("responds with Status 204", async () => {

            const id = 1;

            await  request(app).delete(`/api/properties/${id}/reviews`).expect(204);

          });
        test("deletes the reviews corresponding to the parametric endpoint property",async () => {

          const id = 1;

          await  request(app).delete(`/api/properties/${id}/reviews`);

          const {body} = await  request(app).get(`/api/properties/${id}/reviews`)

            expect(body.reviews.length).toBe(0);
        });
        //  test("returns 'no body' after deleting the review", async () => {

        //     const id = 1;

        //     const {body} = await  request(app).delete(`/api/properties/${id}/reviews`);

        //     console.log(body)

        //     expect(body.msg).toBe("no body");

        //   });

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
    });
})