const express = require('express');
const app = express();
const path = require("path");
const morgan = require('morgan');
// const cors =require("cors");

const homeRouter = require('./routes/home');
const userRouter = require('./routes/users');
const blogRouter = require('./routes/blogs');
const thumbsRouter = require('./routes/thumbs');
const followingRouter = require('./routes/following');


// View Engine
app.set("view engine","ejs");
app.set('views', path.join(__dirname, 'views'));
//static files
app.use(express.static(path.join(__dirname, 'public')));

//middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
// app.use(cors);



app.use(userRouter);
app.use(blogRouter);
app.use(thumbsRouter);
app.use(homeRouter);
app.use(followingRouter);



const PORT = process.env.PORT || 2050;

// the PORT listener
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} PORT`);
})