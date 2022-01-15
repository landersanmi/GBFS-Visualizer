var MongoClient = require('mongodb').MongoClient;

// Connection URI
const uri ="mongodb://127.0.0.1:27017/";

exports.insert = function (userInfo){
    MongoClient.connect (uri, function (err, db) {
        if (err) throw err; 
        var dbo = db.db("OAUTH");
        dbo.collection("Users").insertOne(userInfo, function(err, res) {
            err ? console.log("[Error] User not inserted" + err) : console.log("[+] User inserted") ;
            db.close();
        });
    });
}

exports.findOne = function(userId){
    return new Promise(function(resolve, reject) {
      if (userId.length > 0) {
        MongoClient.connect (uri, function(err, db){
          if (err) throw err; 
          var dbo = db.db("OAUTH");
          dbo.collection("Users").findOne({_id: userId}).then(result => {
              if(result) {
                return resolve(result);
              } else {
                return resolve();
              }
          });        
        });
      } else {
        return resolve();
      }
    })
}
