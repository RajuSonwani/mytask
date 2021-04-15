const express = require('express');
const router = express.Router();


// create blog
router.get('/', async(req, res) => {
    res.redirect("/login")
    
});

router.get('/login', async(req, res) => {
    res.render("login")
    
});
router.get('/signup', async(req, res) => {
    res.render("signup",{ msg:""})
    
});


module.exports = router;