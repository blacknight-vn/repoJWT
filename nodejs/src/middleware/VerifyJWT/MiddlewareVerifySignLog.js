const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const middlewareVerifySignLog = (req, res, next) => {
    let accessToken = req.headers['x-access-token'];
    if (accessToken) {
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return next();
            };
            res.status(200).json({authorization: false, message: 'User Do Not Have Permission To Access'})
        });
    } else {
        next();
    }
}

module.exports = middlewareVerifySignLog;