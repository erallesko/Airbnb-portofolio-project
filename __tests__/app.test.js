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
    })

})