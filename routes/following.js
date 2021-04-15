var express = require('express');
const alert = require("alert")
var router = express.Router();
const FollowingService = require('../services/following');
const Services = new FollowingService();
const BlogService = require('../services/blogs');
const blogServices = new BlogService();
// const Users = require('../models/users');
// const knex = require('../config/dbConfig');


const { authenticateToken } = require('../auth/jwt');


router.get('/add/:id', authenticateToken, async(req, res) => {
    const id = req.decode.id;
    // req.body.user_id = 1;
    // console.log(typeof req.params.id);
    await Services.createFollowing({"user01":id,"user02":Number(req.params.id),"status":1}).then((data) => {
        // console.log(data);
        res.status(200).redirect("/home")
    }).catch((err) => {
        res.send(err);
    })
});
module.exports = router;