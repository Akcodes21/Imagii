const router = require("express").Router();
const User = require("../models/user.model")
const passport = require('passport')


router.get('/login', ensureNotAuthenticated,async(req,res,next)=>{
    res.render('login');
});


router.post('/login',ensureNotAuthenticated, passport.authenticate('local',{
    successRedirect: "/",
    failureRedirect: "/auth/login"
}));

router.get('/register', ensureNotAuthenticated, async(req,res,next)=>{
    res.render('register');
});

router.post('/register', ensureNotAuthenticated, async(req,res,next)=>{
    try{
        const {email} = req.body;
        const doesExist = await User.findOne({email});
        if(doesExist){
            res.redirect("/auth/register")
            return;
        }
        const user = new User(req.body);
        await user.save();
        res.redirect('/auth/login');
    }catch(error){
        next(error);
    }
});

router.get('/logout', ensureAuthenticated, async (req, res, next) => {
    req.logout((error) => {
        if (error) {
            return next(error); // Pass the error to the error-handling middleware
        }
        res.redirect('/'); // Redirect to the homepage or login page
    });
});

module.exports = router;

function ensureAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        next();
    }else{
        res.redirect('/auth/login');
    }
}

function ensureNotAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        res.redirect('back');
    }else{
        next();
    }
}














