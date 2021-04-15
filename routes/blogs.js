const express = require('express');
const router = express.Router();
const BlogService = require('../services/blogs');
const Services = new BlogService();

const { authenticateToken } = require('../auth/jwt');

// create blog
router.post('/createBlog', authenticateToken, async(req, res) => {
    req.body.user_id = req.decode.id;
    await Services.createBlog(req.body).then((data) => {
        res.status(200).redirect("/home")
    }).catch((err) => {
        res.send(err);
    })
});

// update blog
router.get('/updateBlog/:id', authenticateToken, async(req, res) => {
    // console.log("hello there!")
    const blogId = req.params.id;
    const data = await Services.findById(blogId);
    console.log(data);
    res.render("editblog",{data:data})
})

router.post('/updateBlog/:id', authenticateToken,async(req, res) => {
    const blogId = req.params.id;
    await Services.updateById(blogId, req.body).then((data) => {
    res.redirect("/home")
    }).catch((err) => {
        console.log(err);
        res.send(err);
    })
})

// delete blog
router.get('/deleteBlog/:id', authenticateToken, async(req, res) => {
    const blogId = req.params.id;
    await Services.deleteById(blogId).then((data) => {
        if (data > 0) {
            res.redirect("/home");
        } else {
            res.send({"sorry": `blog Id ${blogId} not found!`});
        }
    })
})

// get all blogs
router.get('/getAll', authenticateToken, async(req, res) => {
    // console.log(req.decode.id, "blog table");
    await Services.findAll().then((data) => {
        res.send(data);
    }).catch ((err) => {
        res.send(err);
    })
})

// get blog by id
router.get('/getBlog/:id', authenticateToken, async(req, res) => {
    const blogId = req.params.id;
    await Services.findById(blogId).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    })
})


module.exports = router;