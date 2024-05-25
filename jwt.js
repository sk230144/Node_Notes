const { response } = require('express');
const jwt = require('jsonwebtoken')
require('dotenv').config();


const jwtMiddleWare = (req, res, next) => {
      // Check header have authorization or not

     const authorization = req.headers.authorization
     if(!authorization) return res.status(401).json({error: 'Token nahi mila yrr'});

     //Extract the jwt tocken from req header
     const token = req.headers.authorization.split(' ')[1];
     if(!token) return res.status(401).json({error: 'Unothorized backend'});


     try {
    //process.env.JWT_SECRET
      const decoded =  jwt.verify(token, process.env.JWT_SECRET)
      
      //Attach user info with req object

      req.user = decoded;
      next();


     } catch (error) {
        console.log(error);
        response.status(401).json({error: "Invalid token back"})
     }

}


/** function to generate token */

const generateToken = (userData) => {
         console.log("env print",process.env.JWT_SECRET)
         return jwt.sign(userData, process.env.JWT_SECRET, {expiresIn: 3000});
}


module.exports = {jwtMiddleWare, generateToken};