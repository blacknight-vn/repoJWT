const db = require('../models/index');

const serviceHome = async (email) => {
    let data = await db.User.findOne({
        where: {email: email}
    });
    if (data) {
        return ({authorization: true, message: 'Access Into Home Page successfully', user: data});
    } else {
        return ({authorization: false, message: 'There is no User in AccessToken requested'});
    }
}

module.exports = serviceHome;