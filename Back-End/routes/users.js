const express = require('express');
const router = express.Router();
const User = require('./../models/users');



router.post('/signup',(req,res)=>{
    
    User.addUsers(req,(error,response)=>{
        console.log('post called');
        if(error){
         //windows.alert('username already exists');   
            console.log('error occured.user not added.',error);
        }
        if(response)
        {
            //req.session.username = response.username
            console.log('successful: ',response,' added.');
            res.send(response);
        }
    })
})


router.post('/login',(req,res)=>{
    
    User.findUserForLogin(req,(error,response)=>{
        if(error) {
            console.log('Error Occurred');
            res.status(400).send(error);
        }
        if (response) { 
            if (response!=null) {
                req.session.username = response.username;
                console.log("Success response is: ",JSON.stringify(response));
                res.status(200).send(response);
            } else {
                return res.status(404).send();
            }
        }

    })
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
