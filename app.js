const express = require("express");
const createHttpError = require("http-errors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const session = require ("express-session");
//const connectFlash = require("connect-flash");
const passport = require("passport");
const connectMongo = require('connect-mongo');
const { roles } = require('./utils/constants'); // Assuming constants.js has `roles` object.



require("dotenv").config();

const app = express();
app.use(morgan('dev'));
app.use(express.static('public'));


app.set('view engine', 'ejs' );
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

const MongoStore = connectMongo.create;


app.use(session({
    secret: process.env.SESSION_SECRETE,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true
    },
    store: MongoStore({
        mongoUrl: process.env.MONGO_URI, // Use your MongoDB connection string here
        dbName: process.env.DB_NAME // Optional, specify the database name
    })
}));

app.use(passport.initialize());
app.use(passport.session());
require('./utils/passort.auth');

app.use((req, res, next)=>{
    res.locals.user = req.user
    next();
})



app.use("/", require('./routes/index.route'));
app.use('/auth', require('./routes/auth.route'))
app.use('/user', ensureAuthenticated, require('./routes/user.route'))
app.use('/admin', ensureAuthenticated, ensureAdmin, require('./routes/admin.route'));


//ERROR HANDLING
app.use((req, res, next)=>{
    next(createHttpError.NotFound());//404 error handler
});

app.use((error, req, res, next)=>{
    error.status = error.status || 500
    res.status(error.status);
    res.send(error);
})


const PORT = process.env.PORT || 3000; //normalize the port || if the port is not defining the env file then we will run it on default PORT 

mongoose.connect(process.env.MONGO_URI,{
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,            
    useUnifiedTopology: true,
})
.then(()=>{
    console.log("connected");
    app.listen(PORT, ()=> console.log(`on port ${PORT}`));

})
.catch((err)=>console.log(err.message));

function ensureAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        next()
    }else{
        res.redirect('/auth/login');
    }
}

function ensureAdmin(req,res,next){
    if(req.user.role === roles.admin){
        next();
    }else{
        res.redirect('/');
    }
};


function ensureModerator(req,res,next){
    if(req.user.role === roles.moderator){
        next();
    }else{
        res.redirect('/');
    }
};















