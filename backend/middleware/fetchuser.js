const jwt = require('jsonwebtoken')
require('dotenv').config();

// const jwtKey = "H5a4m3z2a1"

const fetchuser = (req, res, next) => {
    const token = req.header('auth-token') ;
    if (!token){
        return res.status(400).send("Token doesn't Exists");
    }
    try {
        // console.log("token acquired")
        const data = jwt.verify( token, process.env.JWTOKEN )
        // console.log("token verified")
        req.user = data.user.id
        // console.log("token sent in req.user")
        next();
    } catch (error) {
        console.error("Token verification failed:", error.message);
        console.log("Token Error");
        res.status(401).send("Invalid Token error") ;
    }
}

module.exports = fetchuser