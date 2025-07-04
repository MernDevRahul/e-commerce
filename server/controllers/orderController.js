const Order = require("../model/order");

exports.getOrder = async(req,res)=>{
    const {id} = req.user;
    try {
        const data = await Order.find({userId:id})
        res.status(200).json(data)
    } catch (error) {
        res.status(500).send({message:"Server Error",error:error.message});
    }
}

exports.createOrder = async(req,res)=>{
    const {id} = req.user;
    const {address, products} = req.body
    try {
        const orderToBeAdded = new Order({userId:id,products:products, address:address})
        const order = orderToBeAdded.save();
        res.status(200).json(order)
    } catch (error) {
        res.status(200).json({message:"server error", error:error.message})
    }
}