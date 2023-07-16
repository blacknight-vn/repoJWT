const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const middlewareAuth = (req, res) => {
    let accessToken = req.headers['x-access-token'];
    if (accessToken) {
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) res.status(202).json({authorization: true, message: 'Access Successfully'});
            res.status(200).json({authorization: false, message: 'User Do Not Have Permission To Access'})
        });
    } else {
        res.status(202).json({authorization: true, message: 'Access Successfully'})
    }
}

module.exports = middlewareAuth;