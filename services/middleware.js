const constants = require('../constant/constant');


let checkAuthentication = (req, res, next) => {

    let token = req.body.token

    if (token == constants.tokenSlack) {
        next();

    }
    else {

        return res.status(401).json({
            success: false,
            message: 'Auth token is not authenticated'
        });
    }
};


module.exports = {
    checkAuthentication: checkAuthentication,
}