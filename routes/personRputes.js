const express = require("express");
const router = express.Router();
const Person = require("../models/Persons");
const { json } = require("body-parser");
const {jwtMiddleWare, generateToken} = require("./../jwt")


router.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = Person(data);
    const response = await newPerson.save();
    console.log("data saved successfully");

    const payload = {
      id: response.id,
      username: response.username
    }
    
    const token = generateToken(payload);
    console.log("token", token);

    res.status(200).json({response: response, token: token});
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal error saurabh" });
  }
});


 // Login Route

 router.post('/login', async(req, res) => {
    try {
      // Get username and password when user login from front end
      const {username, password} = req.body

      //find that user is present in our db or not
      const user = await Person.findOne({username: username});

      //If user does not exist
      if(!user || !(await user.comparePassword(password))){
             return res.status(404).json({error: "Username or Password is wrong"});
      }
      
      //generate token

      const payload = {
        id : user.id,
        username: user.username
      }

      const token = generateToken(payload);

      //returnn token as response

      res.json({token})

    } catch (error) {
      console.log(error);
      res.status(500).json({error: 'Internal Server Error'});
    }
 })


// Profile route that give the users profile

router.get('/profile', jwtMiddleWare, async(req, res) => {
   try {
      const user = req.user;
      console.log("user data from token is" + user);

      const userId = user.id;

      const userdata = await Person.findById(userId);

      res.status(200).json({userdata});
   } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Bhag ja bkl" });
  }
})







router.get("/", jwtMiddleWare, async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong bro" });
  }
});

//Parameterized get method

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });
      console.log("Data fetched accor to work");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Chala ja bsdk" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Bhag ja bkl" });
  }
});


router.put('/:id', async (req, res) => {
  try {
     const personId = req.params.id;
     const updatedData = req.body;

     const response = await Person.findByIdAndUpdate(personId, updatedData, {
        new: true,  // Return updated data to us
        runValidators: true // Run all validation by mongoose that we have write in schema 
     })
     if(!response){
      return res.status(404).json({error: 'Person not found'});
     }
     console.log("data updated bmro", response);
     res.status(200).json(response);
  } catch (error) {
    res.status(500),json({error: "Chala ja bsdk"});
    console.log("kuch galat hot ahay yrr");
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);
    if(!response){
       return res.status(404).json({error: "Data not found"});
    }
    res.status(200).json({message: "Person ke hatay dehe, khallas"});
  } catch (error) {
    res.status(500),json({error: "Chala ja bsdk"});
    console.log("kuch galat hot ahay yrr");
  }
})

module.exports = router;