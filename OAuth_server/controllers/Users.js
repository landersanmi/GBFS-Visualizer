'use strict';
var usersService = require('../service/UsersService');

const getUser = (req, res, next, user_id) => {
  try{
    var user = usersService.getUser(user_id);
  }catch(err){
    return "404 Invalid User_ID";
  }
  user.then( function (user){
    if(user !== undefined){
      res.send(user);
      return user;
    }else{
      res.send("undefined");
      return user;
    }
  })
  .catch(function(err){
    res.send(err);
    return err;
  });
};

const postUser =  (req, res, next, body, user_id) =>{
  usersService.postUser(body, user_id);
  // El resultado siempre sera correcto aunque se intente insertar un usuario duplicado
  res.send("200 User Posted");
};

module.exports = {
  getUser,
  postUser
};
