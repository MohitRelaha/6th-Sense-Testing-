const express = require('express');
const router = express.Router();
const User = require('./../models/users');

router.use("*",(req,res,next)=>{
    console.log("Middle ware is called");
    res.setHeader('Access-Control-Allow-Origin',"*");
    res.setHeader("Access-Control-Allow-Headers","Content-Type,Access-Control-Allow-Headers,Authorization,X-Requested-With,Accept");
    res.setHeader("Access-Control-Allow-Methods","*");
    res.setHeader("Access-Control-Allow-Credentials","true");
    //console.log(req.session);
    const {UserID} = req.session;
    next();
})


router.post('/signup',(req,res)=>{
    
    User.addUsers(req,(error,response)=>{
        console.log('post called');
        if(error){
         //windows.alert('username already exists');   
            console.log('error occured.user not added.',error);
        }
        if(response)
        {
            console.log('successful: ',response,' added.');
            res.send(response);
        }
    })
})


router.post('/login',(req,res)=>{
    console.log(req.session.UserID);
    console.log("here in login")
    if(!req.session.UserID)
    {
        User.authenticate(req,(error,response)=>{
            if(response==null){
                console.log('login denied');
                res.status(404).end();
            }
            
            if(response){
                console.log('login successful');
                console.log(response._id);

                 req.session.UserId = response._id;
                 console.log(req.session.UserId);
                 console.log(req.session);
                //res.redirect(`http://localhost:3000/welcome`);
                //var auth = {"access" : "true"}
                
                res.send(response);
            
            }
            
        })
    }
    else {
        //res.redirect(`/welcome`);
        console.log('already logged in');
    }
})


router.get('/logout', (req,res,next)=>{
    if(req.session) {
        req.session.destroy(function(err){
            if(err)
                return next(err);
            else
                return res.redirect('/');
        })
    }
})


module.exports = router;
