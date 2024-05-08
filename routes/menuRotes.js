const express = require("express");
const router = express.Router();
const menuItem = require("../models/Menu");



router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenu = menuItem(data);
    const response = await newMenu.save();
    console.log("You have successfully saved item");
    res.status(200).json(response);
  } catch (error) {
    console.log("Yup try again");
    res.status(500).json({ error: "Yup try again bro" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await menuItem.find();
    console.log("Eat and Repeat");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Please come again" });
  }
});

router.get('/:tasteType', async(req, res) => {
    try {
        const tasteType = req.params.tasteType;
        if(tasteType == 'Sweet' || tasteType == 'Sour' || tasteType == 'Spicy'){
            const response = await menuItem.find({taste: tasteType});
            console.log("Mil gya bhai");
            res.status(200).json(response);
        }else{
            res.status(404).json({error: "Nah kuch nhi mil raha"});
        }
    } catch (error) {
        console.log("chala ja bsdk ");
        res.status(404).json({error: "Kuch nhi tera server g m raha hai"});
    }
})



module.exports = router;