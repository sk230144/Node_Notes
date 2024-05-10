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
const LocalStrategy = require('passport-local').Strategy;


app.use(bodyParser.json());
app.use(cors());


//Middleware functions
const logRequest = (req, res, next) => {
  console.log(`${new Date().toLocaleString()} Request made to : ${req.originalUrl}`);
  next(); //Next is use for executing next phase
}

app.use(logRequest)

app.get('/', logRequest, (req, res) => {  // We will use middleware like this, this custom middleware tel us time when any url will hit.
  res.send('Ka ho kaise aha');
})


//Now call api
app.use('/person', personRoute);
app.use('/menu', menuroutes)
  



app.listen(3000, () => {
  console.log("Server is Running");
});
