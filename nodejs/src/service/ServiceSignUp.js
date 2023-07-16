const db = require('../models/index');
const bcrypt = require('bcrypt');
const ROLE_LIST = require('../config/role_list');

const salt = 10;

const serviceSignUp = async(formLogin) => {

    let name = formLogin.username;
    let email = formLogin.email;
    let password = formLogin.password;
    let introduction = formLogin.introduction;

    if(checkInput(name, email, password)) {
            let checkEmail = await handleEmail(email);
            if (checkEmail === 0) {
                let newPassword = await hashPassword(password);
                await db.User.create({
                    username: name,
                    email: email,
                    password: newPassword,
                    introduction: introduction,
                    role: ROLE_LIST.user,
                })
                return({authentication: true, message: 'Sign up New User Successfully'})
            } else {
                return({authentication: false, message: 'Email Already Have'})
            }
    } else {
        return({authentication: false, message: 'Username, Email, Password are Required'})
    };

    }

const checkInput = (name, email, password) => {
    if (!name || !email || !password){
        return false
    }; 
    return true
}

const handleEmail = async(email) => {
    let userDB = await db.User.findAll({
        where: {email: email}
    });
    return userDB.length;
};

const hashPassword = async(password) => {
    let newPassword = await bcrypt.hash(password, salt);
    return newPassword;
}

module.exports = serviceSignUp;