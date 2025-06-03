const { response } = require("../app");
const {fetchReviews, removeReview, addReview} = require("../models/reviews")


exports.getReviews = async (req, res, next) => {

    const {id} = req.params;
    const propertyId = parseInt(id)

    const {rows, average} = await fetchReviews(propertyId);

    reviews = {reviews : rows, average_rating : average}

    res.status(200).send(reviews)

}



exports.deleteReview = async (req, res, next) => {

    const {id} = req.params;

    try{
        const rows = await removeReview(id)
        res.status(204).send();
    }catch(error){
        next(error);
    }
  
};


exports.postReview = async (req, res, next) => {

    const {id} = req.params;
    
    const propertyID = parseInt(id)

    const newReviewData = req.body;

    try{
        const rows = await addReview(propertyID, newReviewData);
        res.status(201).send(rows[0]);
    }catch(error){
        next(error)
    }
   
}