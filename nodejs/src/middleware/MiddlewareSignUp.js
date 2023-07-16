const serviceSignUp = require('../service/ServiceSignUp');

const middlewareSignUp = (req, res) => {

    new Promise((resolve, reject) => {
        let message = serviceSignUp(req.body);
        resolve(message);
    }).then((message) => {
        if (message.authentication) {
            res.status(201).json({authorization: true, message: message.message});
        } else {
            res.status(200).json({authorization: false, message: message.message});
        }
    })
}

module.exports = middlewareSignUp;