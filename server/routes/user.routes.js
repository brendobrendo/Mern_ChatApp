const userController = require("../controllers/user.controller");

module.exports = app => {
    app.post('/user/signup', userController.signup);
    app.post('/user/login', userController.login);
    app.post('/user/isUserAuth', userController.verifyJWT ,userController.isUserAuth);
    app.post('/user/logout', userController.verifyJWT, userController.logoff);
};