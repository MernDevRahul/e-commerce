const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user');

exports.signup = async(req,res)=>{
    try {
        const checkUser = await User.findOne({
            email:req.body.email
        })
        if(checkUser){
            res.status(409).send("User Already Exists");
            return;
        }
        const {password} = req.body;
        const salt = await bcrypt.genSalt(11);
        const hashedPassword = await bcrypt.hash(password,salt);
        const userToBeAdded = new User({...req.body,password:hashedPassword});
        const user = await userToBeAdded.save();
        res.status(200).json({message:"User registered succesfully"})
    } catch (error) {
       res.status(500).json({message:"server error",error:error.message})
    }
}

exports.login = async(req,res)=>{    
    const {email,password} = req.body;
    try {
        const user = await User.findOne({email:email});
        if(user){
            const verify = await bcrypt.compare(password,user.password);
            if(verify){
                const token = jwt.sign({id:user._id,email:user.email},process.env.SECRET);
                res.status(200).json({token,user:{
                    id:user._id,
                    firstName:user.firstName,
                    email:user.email
                }});
            }else{
                res.status(401).json({message:"wrong password"});
            }
        }else{
            res.status(404).json({message:"User doesn't exists"})
        }
    } catch (error) {
        res.status(500).json({message:"Server error",error:error.message})
    }
}

exports.getUser = async(req,res)=>{
    const userId = req.user.id;
    try {
        const user = await User.findById(userId);
        res.status(200).json({
            id:user._id,
            firstName:user.firstName,
            email:user.email,
            role:user.role
        })
    } catch (error) {
        res.status(500).json({message:"Server error",message:error.message})
    }
}