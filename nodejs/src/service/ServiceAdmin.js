const db = require('../models/index');

const serviceAdmin = async (email) => {
    let user = await db.User.findOne({
        where: {email: email}
    });
    if (user) {
        let userAll = await db.User.findAll();
        return ({authorization: true, message: 'Access Into Admin Page As Admin Successfully', userAll: userAll})
    } else {
        return ({authorization: false, message: 'There is No User in AccessToken Requested'})
    }
}

module.exports = serviceAdmin;