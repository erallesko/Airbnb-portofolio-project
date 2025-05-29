const { use } = require("../app");
const {fetchUser, updateUser} = require("../models/users")

exports.getUser = async (req, res, next) =>  {

    const {id} = req.params;

    const rows = await fetchUser(id);

    try{
        user = {user: rows};
        res.status(200).send(user);
    }catch(error){
        next(error)
    }
    
};

exports.patchUser = async (req, res, next) => {

    const {id} = req.params;
    const userId = parseInt(id)

    const {first_name, surname, email, phone_number, avatar} = req.body;

    const rows = await updateUser(userId, first_name, surname, email, phone_number, avatar);

    res.status(200).send({user:rows[0]});
}

