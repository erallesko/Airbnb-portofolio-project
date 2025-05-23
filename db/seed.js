const db = require("./connection");
const tablesDrop = require("./tablesDrop")
const format = require("pg-format");
const getUsers = require("../utils/getUsers");
const getProperties = require("../utils/getProperties");
const getReviews = require("../utils/getReviews");
const getPropertyTypes = require("../utils/getPropertyTypes");
const getImages = require("../utils/getImages");
const getFavourites = require("../utils/getFavourites");
const getBookings = require("../utils/getBookings");
const getAmenities = require("../utils/getAmenities");
const getPropertyAmenities = require("../utils/getPropertyAmenities");

async function seed (propertyTypesData, usersData, propertiesData, reviewsData, imagesData, favouritesData, bookingsData){

   await tablesDrop();
   
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
                    created_at TIMESTAMP DEFAULT NOW()
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
                    created_at TIMESTAMP DEFAULT NOW()
        );`);

    await db.query(`CREATE TABLE images (
                    image_id SERIAL PRIMARY KEY,
                    property_id INTEGER NOT NULL REFERENCES properties(property_id),
                    image_url VARCHAR NOT NULL,
                    alt_text VARCHAR NOT NULL
                    );`);

    await db.query(`CREATE TABLE favourites(
                    favourite_id SERIAL PRIMARY KEY,
                    guest_id INTEGER NOT NULL REFERENCES users(user_id),
                    property_id INTEGER NOT NULL REFERENCES properties(property_id)
                    );`)

    await db.query(`CREATE TABLE bookings(
                    booking_id SERIAL PRIMARY KEY,
                    property_id INTEGER NOT NULL REFERENCES properties(property_id),
                    guest_id INTEGER NOT NULL REFERENCES users(user_id),
                    check_in_date DATE NOT NULL, 
                    check_out_date DATE NOT NULL,
                    created_at TIMESTAMP DEFAULT NOW()
                    );`)
            
    await db.query(`CREATE TABLE amenities(
                    amenities VARCHAR PRIMARY KEY);`);

    await db.query(`CREATE TABLE properties_amenities (
                    property_amenities SERIAL PRIMARY KEY,
                    property_id INTEGER NOT NULL REFERENCES properties(property_id),
                    amenity_slag VARCHAR NOT NULL REFERENCES amenities(amenities));`);





    await db.query(format(`INSERT INTO property_types (property_type, description) VALUES %L`, getPropertyTypes(propertyTypesData)));


    await db.query(format(`INSERT INTO users (first_name, surname, email, phone_number, is_host, avatar) VALUES %L`, getUsers(usersData)));

   const {rows : users} = await db.query(`SELECT * FROM users;`);

    await db.query(format(`INSERT INTO properties (host_id, name, location, property_type, price_per_night, description) VALUES %L`, getProperties(propertiesData, users )));

    const {rows : properties} = await db.query(`SELECT * FROM properties;`)

    await db.query(format(`INSERT INTO reviews (property_id, guest_id, rating, comment) VALUES %L`, getReviews(reviewsData, properties, users)));
   
    await db.query(format(`INSERT INTO images (property_id, image_url, alt_text) VALUES %L`, getImages(imagesData, properties)));
    
    await db.query(format(`INSERT INTO favourites (guest_id, property_id) VALUES %L`, getFavourites(favouritesData, users, properties)));

    await db.query(format(`INSERT INTO bookings (property_id, guest_id, check_in_date, check_out_date) VALUES %L`, getBookings(bookingsData, users, properties)));
   
    await db.query(format(`INSERT INTO amenities (amenities) VALUES %L`, getAmenities(propertiesData)));

    await db.query(format(`INSERT INTO properties_amenities (property_id, amenity_slag) VALUES %L`, getPropertyAmenities(propertiesData, properties)));

};

module.exports = seed;