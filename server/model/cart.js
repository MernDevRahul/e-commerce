const { default: mongoose } = require("mongoose");

const cartSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    quantity:{
        type:Number,
        default:1
    }
})

const Cart = mongoose.model("Cart",cartSchema)

module.exports = Cart;