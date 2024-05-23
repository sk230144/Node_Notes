const express = require("express");
const router = express.Router();
const Person = require("../models/Persons");
const { json } = require("body-parser");


router.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = Person(data);
    const response = await newPerson.save();
    console.log("data saved successfully");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal error saurabh" });
  }
});

router.get("/", async (req, res) => {
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