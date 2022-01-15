'use strict';
var usersDao = require('../daos/UsersDao');

/**
 * Get a User information
 * Retrieve information of a specific User
 *
 * user_id user_id ID of a user
 * returns user
 **/
exports.getUser = function(user_id) {
  return new Promise(function(resolve, reject) {
    if (user_id >= 0) {
      var usersDaoPromise = usersDao.findOne(user_id);
      usersDaoPromise.then(
        (user) =>{ 
          if(user !== undefined){
            return resolve(user);
          }else{
            return resolve();
          }
        }
      );
    } else {
      reject("404 Invalid USER ID");
    }
  });
}


/**
 * Posts a User information
 * Posts new user information for saving it
 *
 * body User 
 * user_id user_id ID of a user
 * returns okMessage
 **/
exports.postUser = function(body,user_id) {
  return new Promise(function(resolve, reject) {
    if (Object.keys(body).length > 0) {
      if(body.body !== undefined){
        resolve(body.body);
      }else{
        resolve(body);
      }
    } else {
      reject("404 No params recived for creating user");
    }

  }).then(
    function(body){
      usersDao.insert(body);
  })
  .catch(
    function(err){
      console.log("POST USER RECHAZADO --> " + err);
  });

}


