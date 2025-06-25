const express = require("express");
const {getProperties, getProperty, deleteFavourite} = require("./controllers/properties");
const {getReviews, deleteReview, postReview} = require("./controllers/reviews");
const {getUser, patchUser} = require("./controllers/users");
const {postFavourite} = require("./controllers/favourites");
const {handlePathNotFound, handleDataNotFound, handleBadRequest, handleInvalidInput} = require("./controllers/errors");
const {getBookings, deleteBooking, getUserBookings} = require("./controllers/bookings");
const {getAmenities} = require("./controllers/amenities");
const app = express();
const cors = require('cors');

app.use(cors());

app.use(express.json());

app.get("/api/properties", getProperties);

app.get("/api/properties/:id/reviews", getReviews);

app.get("/api/properties/:id", getProperty);

app.get("/api/users/:id", getUser);

app.delete("/api/reviews/:id", deleteReview);

app.post("/api/properties/:id/reviews", postReview);

app.patch("/api/users/:id", patchUser);

app.delete("/api/properties/:id1/users/:id2/favourite", deleteFavourite);

app.post("/api/properties/:id/favourite", postFavourite);

app.get("/api/properties/:id/bookings", getBookings);

app.delete("/api/bookings/:id", deleteBooking);

app.get("/api/users/:id/bookings", getUserBookings);

app.get("/api/amenities", getAmenities);

app.use("/", express.static('public'));



app.all("*invalid-path", handlePathNotFound );

app.use(handleInvalidInput);

app.use(handleDataNotFound);

app.use(handleBadRequest);

module.exports = app;