const User = require('../models/user_model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req,res)=>{
    console.log("in register");
    try {
        console.log("in try");
        const {userName,password} = req.body;
        let hashedPassword = await bcrypt.hash(password,10);
        const user = new User({
            userName:userName,
            password:hashedPassword
        })
        await user.save();
        res.send({
            "statusCode":201,
            "msg":"User Created Successfully"
        });
    } catch (error) {
        console.log("error");
        res.send(error);
    }
}

const login = async (req,res)=>{
    try {
        const {userName,password} = req.body;
        const user = await User.find({userName:userName});
        if(user.length>0){
            console.log(user[0].password);
            // bcrypt.compare (input_password,hashed_password,function);
            bcrypt.compare(password,user[0].password,function (err,result){
                if(result){
                    let response = {
                        "statusCode":200,
                        "msg":"Login Successfull",
                        "accessToken":""
                    };
                    let tokenData = {
                        username:userName
                    }
                    let jwtSecretKey = process.env.JWT_SECRET_KEY;
                    const token = jwt.sign(tokenData, jwtSecretKey); 
                    response.accessToken = token;
                    res.cookie('user_cookie',token)
                    res.send(response);
                }else{
                    let response = {
                        "statusCode":400,
                        "msg":"Incorrect User Or Password"
                    }
                    res.send(response);
                }
            })
        }else{
            let response = {
                "statusCode":404,
                "msg":"User not exist"
            }
            res.send(response);
        }
    } catch (error) {
        res.status(500).send({msg:"Server error"});
    }
}

const logout = (req, res)=>{
    try {
        res.clearCookie('user_cookie');
        res.send("cleared");
    } catch (error) {
        console.log(error);
        res.send(error);
    }
  };

const getUser = (req,res)=>{
    try {
        const {user_cookie} = req.cookies;
        jwt.verify(user_cookie, process.env.JWT_SECRET_KEY,{},(err,result)=>{
            if(err) throw new err;
            res.json(result);
        })
    } catch (error) {
        res.send(error);
    }
}

const checkAvblUser = async (req,res)=>{
    try {
        const {userName} = req.body;
        const user = await User.find({userName:userName});
        if(user.length>0){
            res.send({is_username_avbl:false});
        }
        else{
            res.send({is_username_avbl:true});
        }
    } catch (error) {
        res.status(500).send({msg:"Server error"});
    }
}

module.exports = {
    register,
    login,
    getUser,
    logout,
    checkAvblUser
}