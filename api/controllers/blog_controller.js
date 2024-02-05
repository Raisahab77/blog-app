const Blogs = require('../models/blog_model');

const addBlog = async (req,res)=>{
    const {image,title,description} = req.body;
    try {
        console.log(req.user);
        let blog = new Blogs();
        blog.image = image;
        blog.title = title;
        blog.description = description; 
        blog.author = req.user.username;
        await blog.save();
        res.send({
            "status":201,
            "msg":"Blog Added Successfully"
        })
    } catch (error) {
        res.send(error)
    }
}

const getAllBlog = async (req,res)=>{
    try {
        const blogs = await Blogs.find({});
        res.send(blogs);
    } catch (error) {
        res.send(error);
    }
}

const getBlogById = async (req,res)=>{
    try {
        const blogId = req.params.id;
        const blog = await Blogs.findOne({_id:blogId});
        res.send(blog);
    } catch (error) {
        res.send(error);
    }
}

module.exports = {
    addBlog,
    getAllBlog,
    getBlogById
}