const {default:mongoose} = require('mongoose')
const userSchema = mongoose.Schema({
    firstName : {
        type:String,
        required:true
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
    },
    role:{
        type:String,
        default:"user"
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true
    }
})

const User = mongoose.model("User",userSchema);
module.exports = User;