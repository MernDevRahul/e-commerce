const jwt = require("jsonwebtoken");

const verifyToken = (req,res,next)=>{    
    const token = req.headers['authorization'].split(" ")[1]; 
    if(!token){
        return res.status(403).json({message:"Token is required"});
    }
    try {
        const decoded = jwt.verify(token,process.env.SECRET);
        req.user = decoded;
        
        
        next();
    } catch (error) {
        res.status(401).json({message:"Invalid or expired token"});
    }
}
module.exports = verifyToken