const { default: mongoose } = require("mongoose");

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    }
})

const Product = mongoose.model("Product", productSchema);
module.exports = Product;