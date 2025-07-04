const Product = require('../model/projuct')
exports.addProduct = async (req,res)=>{
    try {
        const productToBeAdded = new Product({...req.body})
        const product = await productToBeAdded.save();
        res.status(200).json({message:"Product added succesfully"})
    } catch (error) {
        res.status(500).json({message:"Server Error",error:error.message})
    }
}

exports.getProducts = async(req,res)=>{
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message:"Server error",error:error.message})
    }
}

exports.updateProduct = async(req,res)=>{
    const {id} = req.params.id;
    try {
        const product = await Product.findByIdAndUpdate(req.params.id,req.body)
        res.status(200).json("Product updated Successfully")
    } catch (error) {
        res.status(500).json({message:"Server error",message:error.message})
    }
}