'use strict';


/**
 * Deletes a user information
 * Removes the stored user information
 *
 * user_id user_id ID of a user
 * no response value expected for this operation
 **/
exports.deleteUser = function(user_id) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get a User information
 * Retrieve information of a specific User
 *
 * user_id user_id ID of a user
 * returns user
 **/
exports.getUser = function(user_id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "full_name" : "full_name",
  "id" : "id",
  "email" : "email"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
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
    var examples = {};
    examples['application/json'] = "";
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

