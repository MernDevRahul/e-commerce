const {default: mongoose} = require('mongoose')
const orderSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    products:{
        type:[],
        required:true
    },
    address:{
        type:String,
        required:true
    }
})

const Order = mongoose.model("Order",orderSchema);

module.exports = Order