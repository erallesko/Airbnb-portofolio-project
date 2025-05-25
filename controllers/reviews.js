const { response } = require("../app");
const {fetchReviews, removeReview} = require("../models/reviews")


exports.getReviews = async (req, res, next) => {

    const {id} = req.params;

    const {rows, average} = await fetchReviews(id);

    reviews = {reviews : rows, average_rating : average}

    res.status(200).send(reviews)

}



exports.deleteReview = async (req, res, next) => {

    const {id} = req.params;
 
    const rows = await removeReview(id)

    res.status(204).send({msg: "no body"});
}