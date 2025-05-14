function getFavourites (favourites, users, properties){

    const favouritesData = favourites.map((favourite)=>{

        let user_id = 0;
        let property_id = 0;

        users.forEach(user => {
            if (favourite.guest_name === `${user.first_name} ${user.surname}`){
                user_id = user.user_id;
            }
        });

        properties.forEach(property => {
            if (favourite.property_name === property.name){
                property_id = property.property_id;
            }
        });

        return [user_id, property_id]
     
    });

    return favouritesData;
}

module.exports = getFavourites;