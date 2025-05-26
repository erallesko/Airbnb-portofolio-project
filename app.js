const express = require("express");
const {getProperties, getProperty} = require("./controllers/properties");
const {getReviews, deleteReview, postReview} = require("./controllers/reviews");
const {getUser} = require("./controllers/users");
const app = express();

app.use(express.json());

app.get("/api/properties", getProperties);

app.get("/api/properties/:id/reviews", getReviews);

app.get("/api/properties/:id", getProperty);

app.get("/api/users/:id", getUser);

app.delete("/api/properties/:id/reviews", deleteReview);

app.post("/api/properties/:id/reviews", postReview);
module.exports = app;