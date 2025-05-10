const db = require("./connection");
const format = require("pg-format");
const getUsers = require("../utils/getUsers");
const getProperties = require("../utils/getProperties");
const getReviews = require("../utils/getReviews");
const getPropertyTypes = require("../utils/getPropertyTypes");
const getImages = require("../utils/getImages");
const getFavourites = require("../utils/getFavourites");

async function seed (propertyTypesData, usersData, propertiesData, reviewsData, imagesData, favouritesData){

    await db.query(`DROP TABLE favourites;`)
    await db.query(`DROP TABLE images;`)
    await db.query(`DROP TABLE reviews;`)
    await db.query(`DROP TABLE properties;`)
    await db.query(`DROP TABLE users;`)
    await db.query(`DROP TABLE property_types;`)

   await db.query(`CREATE TABLE property_types (
                    property_type VARCHAR NOT NULL PRIMARY KEY,
                    description TEXT);`);

    await db.query(`CREATE TABLE users(
                    user_id SERIAL PRIMARY KEY,
                    first_name VARCHAR NOT NULL,
                    surname VARCHAR NOT NULL,
                    email VARCHAR NOT NULL,
                    phone_number VARCHAR,
                    is_host BOOLEAN NOT NULL,
                    avatar VARCHAR,
                    created_at TIMESTAMP
        );`)

    await db.query(`CREATE TABLE properties (
                    property_id SERIAL PRIMARY KEY,
                    host_id INTEGER REFERENCES users(user_id),
                    name VARCHAR NOT NULL,
                    location VARCHAR NOT NULL,
                    property_type VARCHAR NOT NULL REFERENCES property_types(property_type),
                    price_per_night DECIMAL NOT NULL,
                    description TEXT
        );`)

    await db.query(`CREATE TABLE reviews (
                    review_id SERIAL PRIMARY KEY,
                    property_id INTEGER NOT NULL REFERENCES properties(property_id),
                    guest_id INTEGER NOT NULL REFERENCES users(user_id),
                    rating INTEGER NOT NULL,
                    comment TEXT,
                    created_at TIMESTAMP
        );`);

    await db.query(`CREATE TABLE images (
                    image_id SERIAL PRIMARY KEY,
                    property_id INTEGER NOT NULL REFERENCES properties(property_id),
                    image_url VARCHAR NOT NULL,
                    alt_text VARCHAR NOT NULL
                    );`);

    await db.query(`CREATE TABLE favourites(
                    facourite_id SERIAL PRIMARY KEY,
                    guest_id INTEGER NOT NULL REFERENCES users(user_id),
                    property_id INTEGER NOT NULL REFERENCES properties(property_id)
                    );`)

    await db.query(format(`INSERT INTO property_types (property_type, description) VALUES %L`, getPropertyTypes(propertyTypesData)));


    await db.query(format(`INSERT INTO users (first_name, surname, email, phone_number, is_host, avatar) VALUES %L`, getUsers(usersData)));

   const users = await db.query(`SELECT * FROM users;`)
   const userTableData = users.rows;

    await db.query(format(`INSERT INTO properties (host_id, name, location, property_type, price_per_night, description) VALUES %L`, getProperties(propertiesData, userTableData )));

    const properties = await db.query(`SELECT * FROM properties;`)
    const propertiesTableData = properties.rows;

    await db.query(format(`INSERT INTO reviews (property_id, guest_id, rating, comment) VALUES %L`, getReviews(reviewsData, propertiesTableData, userTableData)));
   
    await db.query(format(`INSERT INTO images (property_id, image_url, alt_text) VALUES %L`, getImages(imagesData, propertiesTableData)));
    
    await db.query(format(`INSERT INTO favourites (guest_id, property_id) VALUES %L`, getFavourites(favouritesData, userTableData, propertiesTableData)));

    console.log("done");
};

module.exports = seed;