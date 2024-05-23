const jwt = require('jsonwebtoken')


const jwtMiddleWare = (req, res, next) => {

     //Extract the jwt tocken from req header
     const token = req.headers.authorization.split( ' ' )[1];
     if(!token) return res.status(401).json({error: 'Unothorized backend'});


     try {

      const decoded =  jwt.verify(token, process.env.JWT_SECRET)
      
      //Attach user info with req object

      req.user = decoded;
      next();


     } catch (error) {
        console.log(error);
        escape.status(401).json({error: "Invalid token back"})
     }

}


module.exports = jwtMiddleWare;