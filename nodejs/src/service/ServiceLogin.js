const bcrypt = require('bcrypt');
const db = require('../models/index');

const serviceLogin = async(prop) => {
    let email = prop.email;
    let password = prop.password;

    let emailCheck = await checkEmail(email);
    if (emailCheck.check) {
        if (await checkPassword(password, emailCheck.user.password)) {
            return ({authenticate: true, message: 'Login Successfully', email: emailCheck.user.email, role: emailCheck.user.role});
        } else {
            return({authenticate: false, message: 'Wrong Password'})
        }
    } else {
        return ({authenticate: false, message: 'Wrong Email'})
    }
}

const checkEmail = async(email) => {
    let checkEmail = await db.User.findOne({
        where: {email: email}
    });
    if (checkEmail) {
        return ({check: true, user: checkEmail})
    } else {
        return ({check: false});
    }
}

const checkPassword = async(password, userPassword) => {
    return new Promise ((resolve, reject) => {
        bcrypt.compare(password, userPassword, (err, response) => {
            if (response) {
                resolve(true);
            } else {
                resolve(false)
            }
        })
    })
}

module.exports = serviceLogin;