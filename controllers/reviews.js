const {fetchReviews, fetchReviewsAverage} = require("../models/reviews")


exports.getReviews = async (req, res, next) => {

    const {id} = req.params;

    const {rows, average} = await fetchReviews(id);

    reviews = {reviews : rows, average_rating : average}

    res.status(200).send(reviews)

}