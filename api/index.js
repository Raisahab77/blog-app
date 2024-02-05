const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const userRoute = require('./routes/user_route');
const blogRoute = require('./routes/blog_route');
const cookieParser = require('cookie-parser'); 
const dotenv = require('dotenv');
require('./db/db');

const app = express();
app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
dotenv.config();
app.use(cookieParser());


app.get('/getcookie', function (req, res) {
    console.log(req.cookies);
    res.send(req.cookies);
})
// app.get('/',(req,res)=>{
//     res.json({response:200});
// })

// app.post('/register',(req,res)=>{
//     try {
//         console.log(req.body);
//         res.json("Successfull");
//     } catch (error) {
//         res.send(error);
//     }
// })

// app.post('/login',(req,res)=>{
//     try {
//         let username = req.body.username;
//         let password = req.body.password;
//         if(username=='vikasrai'&& password=='12345'){
//             res.send({
//                 status:200,
//                 message:"ok"
//             })
//         }
//     } catch (error) {
//         res.send(error);
//     }
// })

app.use('/user',userRoute);
app.use('/blog',blogRoute);

app.listen(5000);