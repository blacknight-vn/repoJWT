const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const middlewareVerifyJWT = (req, res, next) => {
    let accessToken = req.headers['x-access-token'];
    if (accessToken) {
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) res.status(401).json({authorization: false, message: 'Fail to Verify AccessToken sent'});

            req.email = decoded.email;
            req.role = decoded.role;
            
            next();
        })
    } else {
        res.status(401).json({authorization: false, message: 'There is no AccessToken that being requested'})
    }
}

module.exports = middlewareVerifyJWT;