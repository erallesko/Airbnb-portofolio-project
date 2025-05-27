const db = require("../db/connection");




exports.fetchReviews = async (id) => {

  let query = `SELECT review_id, comment, rating, reviews.created_at,  users.first_name ||' '|| users.surname AS guest_name, users.avatar AS guest_avatar 
                 FROM reviews
                 JOIN users 
                 ON users.user_id = reviews.guest_id
                  `

  if(/[0-9]/.test(id)){
    query += ` WHERE reviews.property_id = ${id}`   
  }
  
  const {rows} = await db.query(query)

  
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
                  WHERE property_id = $1 RETURNING *`)


  const {rows} = await db.query(query, [id])

  return rows;
};


exports.addReview = async (propertyID, newReviewData) => {
 
  const {guest_id, rating, comment} = newReviewData;

  const values = [propertyID, guest_id, rating, comment];

  const query = `INSERT INTO reviews (property_id, guest_id, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *;`

   const {rows} = await db.query(query, values );


  return rows;
}


