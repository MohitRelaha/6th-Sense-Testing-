const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('../dbConnectionUsers');

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
    },
  firstname:{
    type: String,
    unique: false,
    required: true,
    trim: true
  },
  lastname:{
    type: String,
    unique: false,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  passwordConf: {
    type: String,
    required: true,
  },
  gender:{
      type:String,
      required: true
  }
});
var User = mongoose.model('User', UserSchema);

/*User.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash){
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});*/

User.addUsers = function(req,callBack) {
    let user=req.body;
    console.log(user);
    var salt = bcrypt.genSaltSync(10);
    var hash1 = bcrypt.hashSync(user.password, salt);
    var hash2 = bcrypt.hashSync(user.passwordConf, salt);
    user.password=hash1;
    user.passwordConf=hash2;
    if(user.password === user.passwordConf)
        User.create(user,callBack);
         
}

User.authenticate = function(req,callBack) {
  User.findOne({username: req.body.username})
  .exec(function(err,user){
    //console.log(user);
    if(err){
      console.log('error');
      return callBack(err,null)
    }
    else if(!user){
      console.log('user not found');
      return callBack(err,null);
    }
    console.log(req.body.password);
    /*if(req.body.password === user.password)
       callBack(err,user);
    else
       callBack(err,null);*/
    bcrypt.compare(req.body.password, user.password).then((res) => {
    // res === true
    if(res === true)
      callBack(err,user);
    else
      callBack(err,null);
    });
       

  })
}


module.exports = User;
