var express = require('express');
var router = express.Router();
//import the User model
const User = require('../../models/user');

var validateToken = require('../../middleware/validateToken')

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Login = require('../../models/login');


/* GET users listing. */
router.get('/', (req, res, next) => {
  // res.send('respond with a resource');

  User.find({}, (err, users) => {          //to find all users make the first para empty {},
    // () <- is the call back(returns u either the error or results)

    //handle if error occured
    if (err) {   //if error is truffy (came back with a value)
      console.log(err)
      res.status(500).send('An error occured')
    }
    console.log(users)
    res.json(users)
  })
});

/* GET users listing. */
router.post('/foo', (req, res, next) => {
  res.send('respond with FOO');

});

router.post('/register', (req, res) => {
  //get the email from the body of the request

  let entered_email = req.body.email;

  //create an instance of the user model
  const user = new User(req.body)
  user.validate((error) => {  //if validate is good errror should come back as null
    // console.log(error);

    if (error) {
      //we have validation errors.. respond with details
      return res.status(422).send(error)
    }

    //query the db with the user model to see if a docuemnt already exists with the submitted email
    //if exists...respond with 400 and in the response send back message that 
    //user already exists


    User.findOne({ email: entered_email }, function (err, usr) {
      if (err) {
        //console.log(err);
        res.status(400).send({ serverMessage: "user already exists" });
      } else {
        console.log("Result :", usr);

        if (usr == null) {
          console.log("email doesn't exist");

          //REGISTER - USE HASH
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            console.log("BCRYPT..")
            if (err) {
              console.log("ERROR HASHNG")
              res.status(400).send({serverMessage: "error hashing"});
            } else {
              console.log("HASHING .....")
              req.body.password = hash;

              console.log("hashed is: " + hash);
              console.log("CREATING .." + req.body)
              User.create(req.body, (err, savedUser) => {        //take body that came from req and create a user from it
                if (err) {
                  console.log("error creating user");
                  res.status(400).send({serverMessage: "error creating user"});
                } else {
                  console.log(savedUser);

                  var token = jwt.sign({ email: req.body.email }, process.env.SECRET, {
                    expiresIn: 86400 // 24 hours
                  });
                  res.header('Access-Control-Expose-Headers', 'x-auth-token');
                  res.header('x-auth-token', token);
                  res.status(201).send("successfully created " + req.body.email + " with token: " + token);

                }

              })

            }
          });

        }
      }
    });
  })

  //replace the req.body.password value with the hashed equivalent


  //Use the user model to insert a new record
  //may have a validation error

  //if the user was succesfully created 
  //generate a json web token

  //end a response back to the client


  //if USER DOESNT EXIST (use create )- use  the user model to insert a new record
  //validation will happen when we try to create user 
})

router.post('/login', (req, res) => {
  console.log('running')
  console.log('reqbody' + req.body)
  // req.body eg. { email: 'w0459469@cnscc.ca', password: "letmein" }

  //create an instance of the login model
  const login = new Login(req.body)
  login.validate((error) => {  //if validate is good errror should come back as null
    // console.log(error);

    if (error) {
      //we have validation errors.. respond with details
      return res.status(422).send(error)
    }

    //query the DB using the User model to see 
    //see if there is a user with the provided email
    //if theres no returned user...respond with unauthorised response(401)

    User.findOne({ email: req.body.email }, function (err, usr) {

      if (err) {
        //console.log(err);
        res.status(401).send({ serverMessage: "Error" });
      } else if (!usr) {
        res.status(401).send({ serverMessage: "no user found" });
      } else {
        console.log("Result :", usr);

        if (usr == null) {
          console.log("couldn't find user email");
          res.status(401).send({ serverMessage: "Unauthorized" });
        } else {
          // //LOGIN - USE COMPARE
          // //to check if a pw is valid it has to match, so take plain text and algorithm tells u if its a match
          //COMPARING THE PW WE ENTERED WITH HASHED PW IN DATABASE
          console.log("HASH FROM DB" + req.body.password);
          bcrypt.compare(req.body.password, usr.password, (err, isMatch) => {
            console.log("ismatch? " + isMatch);
            console.log('>>hash' + usr.password);
            if (!isMatch) {
              //if there is no match..respond with unauthorised response(401)
              res.status(401).send({ serverMessage: "Invalid Login" });

            } else {
              //if there is a match..create a jwt token and send back in CUSTOM RESPONSE HEADER x-auth-token
              //get the email from the body of the request

              var token = jwt.sign({ email: req.body.email }, process.env.SECRET, {
                expiresIn: 86400 // 24 hours

              });
              console.log('token' + token);

              res.header('Access-Control-Expose-Headers', 'x-auth-token');
              res.header('x-auth-token', token);


              res.status(200).send("Login Successful");
              //in header we sould see the generated token

            }
          })
        }
      }

    })
  });

  //if there is a user...compare the submitted pw wit the user's pw hash(bcrypt)


  //DELETE FRIEND BY ID
  router.delete('/:id', validateToken, (req, res) => {
    console.log("DELETE");

    User.findByIdAndRemove(req.params.id, function (err, docs) {
      if (err) {
        console.log(err)
        res.status(404).send("error removing user");
      }
      else {
        console.log("Removed User : ", docs);
        res.status(204).send("Removed user");
      }
    });

  })



})
module.exports = router;
