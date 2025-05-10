const db = require("./connection");
const format = require("pg-format");
const getArrays = require("../utils/getArrays")
const getUsers = require("../utils/getUsers");
const getProperties = require("../utils/getProperties");

async function seed (propertyTypesData, usersData, propertiesData){


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
        );`)

    await db.query(format(`INSERT INTO property_types (property_type, description) VALUES %L`, getArrays(propertyTypesData)));


    await db.query(format(`INSERT INTO users (first_name, surname, email, phone_number, is_host, avatar) VALUES %L`, getUsers(usersData)));

   const users = await db.query(`SELECT * FROM users;`)
   const userTableData = users.rows

   
    await db.query(format(`INSERT INTO properties (host_id, name, location, property_type, price_per_night, description) VALUES %L`, getProperties(propertiesData, userTableData )));

    console.log("done");
};

module.exports = seed;