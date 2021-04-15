var express = require('express');
const alert = require("alert")
var router = express.Router();
const UserService = require('../services/users');
const Services = new UserService();
const FollowingService = require('../services/following');
const followingServices = new FollowingService();
const BlogService = require('../services/blogs');
const blogServices = new BlogService();
// const Users = require('../models/users');
const knex = require('../config/dbConfig');


const { generateAccessToken } = require('../auth/jwt');
const { authenticateToken } = require('../auth/jwt');

// create users account
router.post('/signup', async (req, res) => {
    await Services.createUsers(req.body).then((data) => {
        res.render("signup", { msg: "you are registered successfully!" })
    }).catch((err) => {
        res.send(err);
    })
});

// login user with JWT
router.post('/login', async (req, res) => {
    const userInfo = await Services.checkMobile(req.body.mobile);
    if (userInfo) {
        const passCheck = await Services.PassChecking(userInfo, req.body.password);
        // console.log(passCheck);
        if (passCheck) {
            const token = generateAccessToken(userInfo);
            res.cookie("key", token);
            res.redirect("/home");
        } else {
            res.send({ "sorry": "wrong password!" });
        }
    } else {
        res.send({ "sorry": "This mobile isn't registered!" });
    }
});

// // get all users
// router.get('/users', async (req, res) => {
//     const allUsers = await Services.findAll();
//     res.send(allUsers)
// })

// // get user by id
// router.get('/user/:id', authenticateToken, async(req, res) => {
//     const userId = req.decode.id;
//     await Services.findById(userId).then((data) => {
//         res.send(data);
//     }).catch((err) => {
//         res.send(err);
//     })
// })

//profile
router.get("/profile/:id",authenticateToken,async(req,res)=>{
    const userId = req.decode.id;
    const data = req.decode;
    try{
        const blogByUserId = await blogServices.getAll(userId);
        const followings = await followingServices.getAll(userId);
        res.render("profile",{data:{udata:data,blogs:blogByUserId,count:followings[0]}});
    }catch(err){
        // console.log(err)
        res.send(err);
    }
});

//c_profile
router.get("/c_profile/:id",authenticateToken,async(req,res)=>{
    const userId = req.params.id
    const data = req.decode;
    try{
    const c_data = await Services.findById(userId);
    const followings = await followingServices.getAll(userId);
    res.render("c_profile",{data:{udata:data,user:c_data,count:followings[0]}});
    }catch(err){
        res.send(err);
    }
})


router.get("/home",authenticateToken,async(req,res)=>{
    const data = req.decode;
    try{

        let allUsers = await Services.findAll(req.decode.id);
        const blogs = await blogServices.findAll();
        res.render("home",{data:{data:data,users:allUsers,blogs:blogs}});
    }catch(err){
        res.send(err);
    };
})


router.get("/logout", (req, res) => {
    res.clearCookie('key').redirect("/")
})


module.exports = router;