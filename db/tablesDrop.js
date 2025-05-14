const db = require("./connection");

async function tablesDrop (){

    await db.query(`DROP TABLE properties_amenities;`);
    await db.query(`DROP TABLE amenities;`);
    await db.query(`DROP TABLE bookings;`);
    await db.query(`DROP TABLE favourites;`);
    await db.query(`DROP TABLE images;`);
    await db.query(`DROP TABLE reviews;`);
    await db.query(`DROP TABLE properties;`);
    await db.query(`DROP TABLE property_types;`);
    await db.query(`DROP TABLE users;`);

};

module.exports = tablesDrop;