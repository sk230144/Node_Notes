//***************************************** Callback function *************************************** */

// function add(a, b){
//     return a+b;
// }

// var result = (a, b) => {
//     return a+b;
// };

// var add = result(100, 98);
// console.log(add);

// function callback(){
//     console.log("saurabh is doing something");
// }
// function add(a, b, callback){
//     var result = a+b;
//     console.log(result);
//     callback();
// }
// add(3,4, callback);

// function add1(a, b, saurabh){
//     var result = a+b;
//     console.log("addition:", result);
//     saurabh();
// }
// add1(2, 3, () => {
//     console.log("this is callback, in another way");
// })

// **************************Os module ********************************

// const os = require('node:os');
// const op1 = os.userInfo();
// const op = os.cpus();
// console.log(op1);

// const fs = require('fs');

// fs.appendFile('Saurabh.txt', "* . *", () =>{
//     console.log("file created");
// })

// // Export Property

// const notes = require('./Notes');
// var sec = notes.age;
// const result = notes.sum(3, sec);
// console.log(notes.age);
// console.log(result)

// // Lodash

// // lodash is used to make operations in node js it is very useful

// const lod = require('./Lodash');

// console.log("lodash export successfull",lod.result);

const express = require("express");
const app = express();
const db = require("./db");
const bodyParser = require("body-parser");
const cors = require("cors");
const personRoute = require('./routes/personRputes') 
const menuroutes = require('./routes/menuRotes');
const passport = require('passport');
const Person = require("./models/Persons");
const LocalStrategy = require('passport-local').Strategy;


app.use(bodyParser.json());
app.use(cors());


//Middleware functions
const logRequest = (req, res, next) => {
  console.log(`${new Date().toLocaleString()} Request made to : ${req.originalUrl}`);
  next(); //Next is use for executing next phase
}

app.use(logRequest)


//*****************************************Passsport Logic Implementation  **********************************************/

passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    console.log('Received Credentials:', username);
    const user = await Person.findOne({ username });

    if (!user) {
      return done(null, false, { message: 'Incorrect Username' });
    }

    const isPasswordMatch = user.password === password;

    if (isPasswordMatch) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'Incorrect Password' });
    }
  } catch (error) {
    return done(error);
  }
}));


app.use(passport.initialize());




//**************************************************************All Done ********************************************************* */







//Now call api

//*****************************Calling that auth passport on person route without session for now */

const localAuthMiddleware = passport.authenticate('local', {session: false});

app.get('/', localAuthMiddleware, logRequest, (req, res) => {  // We will use middleware like this, this custom middleware tel us time when any url will hit.
  res.send('Ka ho kaise aha');
})

// Now for this we have created a new user in person with username and opassword and for accessing this we ail pass that username and password like this in postman in params.......http://localhost:3000/?username=sakshi17&password=12345

// ****** Now as like this for any api we can do this and he will see result after he have to pass username and password in params



app.use('/person', personRoute);


//// *****************************************Done Passport ****************************************



app.use('/menu', menuroutes)
  



app.listen(3000, () => {
  console.log("Server is Running");
});
