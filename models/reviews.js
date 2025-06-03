const db = require("../db/connection");




exports.fetchReviews = async (propertyId) => {

  let query = `SELECT review_id, comment, rating, reviews.created_at,  users.first_name ||' '|| users.surname AS guest_name, users.avatar AS guest_avatar 
                 FROM reviews
                 JOIN users 
                 ON users.user_id = reviews.guest_id
                 WHERE reviews.property_id = $1
                 ORDER BY reviews.created_at DESC
                  `
  
  const {rows} = await db.query(query, [propertyId])

  if(rows[0] === undefined){
    return Promise.reject( {status : 404, msg : "Review not found."})
  };

  let total = 0;
  let average = 0;

  rows.forEach((review) => {
    total += review.rating
  })

  average = total/rows.length;

  return {rows, average};
};



exports.removeReview = async (id) => {

  let query = (`DELETE FROM reviews 
                  WHERE review_id = $1 RETURNING *`)


  const {rows} = await db.query(query, [id])

  if(rows[0] === undefined){
    return Promise.reject( {status : 404, msg : "Review not found."})
  };

  return rows;
};


exports.addReview = async (propertyID, newReviewData) => {
 

  const {guest_id, rating, comment} = newReviewData;
 
  if(!guest_id || !rating || !comment){
    return Promise.reject({status: 400, msg: "Invalid input."})
  }

  const values = [propertyID, guest_id, rating, comment];


  const {rows: [propertyData]} = await db.query(`select * from properties where property_id =$1`, [propertyID])
  if(!propertyData){
    return Promise.reject({status: 404, msg: "Property not found."})
  };



  const query = `INSERT INTO reviews (property_id, guest_id, rating, comment) VALUES ($1, $2, $3, $4)
                 RETURNING *;`


  const {rows} = await db.query(query, values );

  return rows;
}


