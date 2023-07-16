const serviceAdmin = require('../service/ServiceAdmin');

const middlewareAdmin = async (req, res) => {
    let email = req.email;
    let message = await serviceAdmin(email);
    if (message.authorization) {
        res.status(200).json({authorization: true, message: message.message, userAll: message.userAll})
    } else {
        res.status(200).json({authorization: false, message: message.message})
    }
}

module.exports = middlewareAdmin;