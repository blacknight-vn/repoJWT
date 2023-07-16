const serviceLogin = require('../service/ServiceLogin');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const db = require('../models/index');

dotenv.config();

async function middlewareLogin(req, res){
    let message = await serviceLogin(req.body);
    if (message.authenticate) {
        let email = message.email;
        let role = message.role;

        const accessToken = jwt.sign({
            "email": email,
            "role": role,
        }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: 300,
        });

        const refreshToken = jwt.sign({
            "email": email,
        }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: 60 * 60 * 24,
        });

        await db.User.update({
            refreshToken: refreshToken,
        }, {
            where: {email: email}
        })

        res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.status(200).json({authorization: true, message: message.message, accessToken: accessToken})
    } else {
        res.status(200).json({authorization: false, message: message.message})
    }
}

module.exports = middlewareLogin;

