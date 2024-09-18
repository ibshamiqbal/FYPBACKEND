// const express = require ('express')
// const authRoute = express.Router()

// const cookieParser = require ('cookie-parser')
// const path = require ('path')


// authRoute.use(express.json())
// authRoute.use(express.urlencoded({extended : true}));
// authRoute.use(express.static(path.join(__dirname , 'public')));
// authRoute.use(cookieParser());
// const userModel = require ('../models/user.model')
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const nodemailer = require('nodemailer');


// authRoute.get('/' , function(req, res){
//     res.render('index')
// });

// authRoute.post('/create' , (req,res)=>{
//     let {username , email , password , age} = req.body;

//     bcrypt.genSalt(10,(err,salt) =>{
//         bcrypt.hash(password,salt, async(err,hash)=>{
            
//             let createdUser = await userModel.create({
//             username , 
//             email , 
//             password : hash, 
//             age
        
//         })

//         let token = jwt.sign({email},"shhhhhhh")
//         res.cookie("token",token)
//         res.send("Your registeration has been successully completed");
//         sendVerifyMail(req.body.name , req.body.email , userData._id);
        
//         })
    
//     })

// })

// const sendVerifyMail = async(name , email , email_id)=>{
//     try{
//         nodemailer.createTransport({
//             host:'smtp.gmail.com',
//             port:587,
//             secure:false,
//             requireTLS:true,
//             auth:{
//                 user:'sandeep@gmail.com',
//                 pass:''
//             }
//         })

//         const mailOptions = {
//             from:'sandeepenact@gmail.com',
//             to:email,
//             subject:'For verification mail',
//             html:'<p>Hi '+name+',please click here to <a href=""'
//         }

//     }
//     catch(error){
//         console.log(error.message)
//     }
// }









// authRoute.get('/login' , function(req,res){
//     res.render('login')

// })


// authRoute.post('/login' , async function(req,res){
//     let user = await userModel.findOne({email: req.body.email});
//     if(!user) return res.send("Something is wrong");

//     bcrypt.compare(req.body.password , user.password , function(err,result){
//         if(result){
//             let token = jwt.sign({email:user.email},"shhhhhhh")
//             res.cookie("token",token)
//             res.send("Yes you can login");
//         }
//         else res.send("Something is wrong")
//     })

// })



// authRoute.get("/logout" , function(req,res){
//     res.cookie("token" , " ")
//     res.redirect("/auth");
// })

// module.exports = { authRoute}

const express = require('express');
const authRoute = express.Router();
const { signup, login, logout, create ,verifyEmail ,forgotPassword , resetPassword , checkAuth} = require('../controllers/auth.controller');
const {verifyToken} = require('../middleware/verifyToken')

authRoute.get("/check-auth", verifyToken , checkAuth);
authRoute.get("/create", create);
authRoute.post("/signup", signup);
authRoute.post("/login", login);
authRoute.get("/logout", logout);

authRoute.post("/verify-email", verifyEmail);
authRoute.post("/forgot-password", forgotPassword);
authRoute.post("/reset-password/:token", resetPassword);


module.exports = {authRoute}
