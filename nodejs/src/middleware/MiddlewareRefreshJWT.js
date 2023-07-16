const jwt = require('jsonwebtoken');
const db = require('../models/index');
const dotenv = require('dotenv');
dotenv.config();

const middlewareRefreshJWT = (req, res) => {
    let refreshToken = req.cookies['refreshToken'];
    if (refreshToken) {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
            if (err) res.status(200).json({authorization: false, message: 'Wrong RefreshToken'});

            let user = await db.User.findOne({
                where: {email: decoded.email}
            });

            if (user) {
                if (user.refreshToken === refreshToken) {
                    const accessToken = jwt.sign({
                        email: user.email,
                        role: user.role,
                    }, process.env.ACCESS_TOKEN_SECRET, {
                        expiresIn: 300,
                    });
                    res.status(200).json({authorization: true, message: 'RefreshToken Successfully', accessToken: accessToken});
                } else {
                    res.status(200).json({authorization: false, message: 'RefreshToken Not Match'})
                }
            } else {
                res.status(200).json({authorization: false, message: 'Email in RefreshToken Not Found In DB'})
            }
        })
    } else {
        res.status(200).json({authorization: false, message: 'There is no RefreshToken Sent'})
    }
}

module.exports = middlewareRefreshJWT;