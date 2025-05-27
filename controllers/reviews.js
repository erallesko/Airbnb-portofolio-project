const { response } = require("../app");
const {fetchReviews, removeReview, addReview} = require("../models/reviews")


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
};


exports.postReview = async (req, res, next) => {

    const {id} = req.params;
    
    const propertyID = parseInt(id)
    
    const newReviewData = req.body;

    const rows = await addReview(propertyID, newReviewData);

    
    res.status(201).send(rows[0]);
}