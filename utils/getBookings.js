function getBookings (bookings, users, properties) {

    const bookingsData = bookings.map((booking)=>{

        let property_id = 0;
        let user_id = 0;

        users.forEach(user => {
            if (booking.guest_name === `${user.first_name} ${user.surname}`){
                user_id = user.user_id;
            }
        });

        properties.forEach(property => {
            if (booking.property_name === property.name){
                property_id = property.property_id;
            }
        });

        return [property_id, user_id, booking.check_in_date, booking.check_out_date];

        });

   return bookingsData;
}

module.exports = getBookings;