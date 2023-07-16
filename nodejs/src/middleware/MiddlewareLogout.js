const db = require('../models/index');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const middlewareLogout = (req, res) => {
    let refreshToken = req.cookies['refreshToken'];
    console.log(refreshToken)
    if (refreshToken) {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
            if (err) res.status(200).json({authorization: true, message: 'Wrong RefreshToken'});

            let email = decoded.email;
            let user = await db.User.findOne({
                where: {email: email}
            });
            if (user) {
                if (user.refreshToken === refreshToken) {

                    await db.User.update({
                        refreshToken: null,
                    }, {
                        where: {email: user.email}
                    })

                    res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'None', secure: true })
                    res.status(200).json({authorization: true, message: 'Logout User Successfully'});
                } else {
                    res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'None', secure: true })
                    res.status(200).json({authorization: true, message: 'RefreshToken in Cookie not Validate'})
                }
            } else {
                res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'None', secure: true })
                res.status(200).json({authorization: true, message: 'No User Email Exist in RefreshToken'})
            }

        })
    } else {
        res.status(200).json({authorization: false, message: 'No RefreshToken in Cookie'})
    }
}

module.exports = middlewareLogout;