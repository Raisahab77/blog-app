const express = require('express');
const route = express();

const blogController = require('../controllers/blog_controller');
const verifyToken = require('../utils/verify');

route.get('/get-blogs',blogController.getAllBlog);
route.get('/get-blog/:id',blogController.getBlogById);
route.post('/add-blog',verifyToken,blogController.addBlog);

module.exports = route;