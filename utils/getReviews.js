function getReviews (reviews, propertyData, userData){


    const reviewsData = reviews.map((review)=>{

    let property_id = 0; 
    let guest_id = 0;;


        propertyData.forEach((property) => {
            if (review.property_name === property.name){
                property_id = property.property_id
            };
        })

        userData.forEach((user) => {
            if (review.guest_name === `${user.first_name} ${user.surname}`){
                guest_id = user.user_id
            };
        })

        return [property_id, guest_id, review.rating, review.comment];
        });

    return reviewsData;
}

module.exports = getReviews;