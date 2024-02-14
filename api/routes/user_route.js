const express = require('express');
const route = express();

const userController = require('../controllers/user_controller');

route.post('/register',userController.register);
route.post('/login',userController.login);
route.get('/profile',userController.getUser);
route.get('/logout',userController.logout);
route.post('/check-user-avbl',userController.checkAvblUser);

module.exports = route;