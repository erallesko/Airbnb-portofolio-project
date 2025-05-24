const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");

afterAll(() => {
    db.end();
});


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
    })
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
    })
})