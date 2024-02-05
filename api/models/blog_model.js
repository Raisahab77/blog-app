const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    image:{
        type:String
    },
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    author:{
        type:String,
        require:true,
    },
    },
    {timestamps:true}
)

const Blogs = new mongoose.model("Blog",blogSchema);

module.exports = Blogs;