const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/blog-app').then(()=>{
    console.log("Connection successfull");
}).catch((e)=>{
    console.log("Unable to connect with database",e);
})