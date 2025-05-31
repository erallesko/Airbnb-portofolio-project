
exports.handlePathNotFound = async (req, res, next) => {
    res.status(404).send({msg: "Path not found."}
    )
};

exports.handleInvalidInput = async (err, req, res, next) => {
    if(err.code === '22P02' || err.code === '23503'){
        res.status(400).send({msg: "Invalid input."})
    }else{
        next(err);
    }
}

exports.handleDataNotFound = async (err, req, res, next) => {
if(err.status){
        res.status(err.status).send({msg: err.msg});
}else{
        next(err);
    }
};

exports.handleBadRequest = async (err, req, res, next) => {
    res.status(400).send({msg: "Bad request."});
}