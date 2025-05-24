const {fetchUser} = require("../models/users")

exports.getUser = async (req, res, next) =>  {

    const {id} = req.params;

    const rows = await fetchUser(id);

    user = {user: rows};

    res.status(200).send(user);
};

