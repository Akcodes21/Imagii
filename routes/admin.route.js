const User = require('../models/user.model');
const router = require("express").Router();
const mongoose = require('mongoose');
const {roles} = require('../utils/constants');


router.get('/users', async(req,res,next)=>{
    try{
        const users = await User.find();
       // res.send(users);
        res.render('manage-users', {users});
    }catch(error){
        next(error);
    }
});

router.get('/user/:id', async(req,res,next)=>{
    try{
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            res.redirect('/admin/users');
            return;
        }
        const person = await User.findById(id);
        res.render('profile', {person});
    }catch(error){
        next(error);
    }
});

router.post('/update-role', async(req,res,next)=>{
    try{
    const {id, role} = req.body
    if(!id || !role){
        return res.redirect(req.get("Referrer") || "/");
    }

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.redirect(req.get("Referrer") || "/");    }

    const rolesArray = Object.values(roles);
    if(!rolesArray.includes(role)){
        return res.redirect(req.get("Referrer") || "/");    }

    if(req.user.id === id){
        return res.redirect(req.get("Referrer") || "/");    }

    const user = await User.findByIdAndUpdate(id, {role}, {new: true, runValidators: true});
    return res.redirect(req.get("Referrer") || "/");
    }catch(error){
        next(error);
    }
});

module.exports= router;