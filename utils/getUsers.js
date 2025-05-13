function getUsers(users){

    const usersData = users.map((user) => {

        let host = false;

        if (user.role === "host"){
            host = true;
        }

        return [user.first_name, user.surname, user.email, user.phone_number, host, user.avatar];  
       
    })
    
    return usersData;
}

module.exports = getUsers;
