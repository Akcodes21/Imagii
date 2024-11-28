const router = require("express").Router();

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/auth/login');
};

router.get('/profile', isAuthenticated, async (req, res, next) => {
    try {
        res.render('profile', { user: req.user });
    } catch (error) {
        console.error(error); // Log error for debugging
        next(error);
    }
});




module.exports = router;