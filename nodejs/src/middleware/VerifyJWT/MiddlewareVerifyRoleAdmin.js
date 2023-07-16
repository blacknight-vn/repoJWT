const ROLE_LIST = require('../../config/role_list');

const middlewareVerifyRoleAdmin = (req, res, next) => {
    let role = req.role;
    if (role === ROLE_LIST.admin) {
        next();
    } else {
        res.status(200).json({authorization: false, message: 'User not Authorized'})
    }

}

module.exports = middlewareVerifyRoleAdmin;