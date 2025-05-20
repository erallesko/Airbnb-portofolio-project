const request = require("supertest");
const app = require("../app");


describe ("app", () => {
    describe ("get request at /api/properties", () => {
        test("responds with Status 200", async () => {

          await  request(app).get("/api/properties").expect(200);
        })
        test("responds with an array of properties that have property_id", async () => {
           
            const {body} = await request(app).get("/api/properties");

            expect(Array.isArray(body.properties)).toBe(true);
            
            body.properties.forEach(property => {
                expect(property.hasOwnProperty("property_id")).toBe(true);
            });
        });
        test("responds with an array of properties that have property_name", async () => {
           
            const {body} = await request(app).get("/api/properties");

            
            body.properties.forEach(property => {
                expect(property.hasOwnProperty("property_id")).toBe(true);
                expect(property.hasOwnProperty("property_name")).toBe(true);

            });
        });
        test("responds with an array of properties that have location", async () => {
           
            const {body} = await request(app).get("/api/properties");

            
            body.properties.forEach(property => {
                expect(property.hasOwnProperty("property_id")).toBe(true);
                expect(property.hasOwnProperty("property_name")).toBe(true);
                expect(property.hasOwnProperty("location")).toBe(true);

            });
        });
        test("responds with an array of properties that have price_per_night", async () => {
           
            const {body} = await request(app).get("/api/properties");

            
            body.properties.forEach(property => {
                expect(property.hasOwnProperty("property_id")).toBe(true);
                expect(property.hasOwnProperty("property_name")).toBe(true);
                expect(property.hasOwnProperty("location")).toBe(true);
                expect(property.hasOwnProperty("price_per_night")).toBe(true);

            });
        });
        test("responds with an array of properties that have host ", async () => {
           
            const {body} = await request(app).get("/api/properties");

            console.log(body.properties)
            
            body.properties.forEach(property => {
                expect(property.hasOwnProperty("property_id")).toBe(true);
                expect(property.hasOwnProperty("property_name")).toBe(true);
                expect(property.hasOwnProperty("location")).toBe(true);
                expect(property.hasOwnProperty("price_per_night")).toBe(true);
                expect(property.hasOwnProperty("host")).toBe(true);

            });
        });
    })
})