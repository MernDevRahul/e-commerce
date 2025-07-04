const Cart = require("../model/cart");


exports.addToCart = async (req,res)=>{

    
    const userId =req.user.id
    const productId = req.body.id;
    
    try {
        let cartItem = await Cart.findOne({ userId, productId });        
        if (cartItem) {
            
            cartItem.quantity += 1;
            await cartItem.save();
            return res.status(200).json({ message: "Cart updated", cartItem });
        } else {            
            const newCartItem = new Cart({ userId, productId });
            
           const cartItem =  await newCartItem.save();           
            return res.status(200).json(cartItem);
        }
    } catch (error) {
        res.status(500).json({message:"Server error", error:error.message})
    }
}

exports.removeFromCart = async (req, res) => {
    const userId = req.user.id
    try {
        const deletedItem = await Cart.findOneAndDelete({ userId });
        if (deletedItem) {
            return res.status(200).json({ message: "Product removed from cart", deletedItem });
        } else {
            return res.status(404).json({ message: "Product not found in cart" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

exports.updateCart = async(req,res)=>{
    const userId = req.user.id;
    const productId = req.params.id
    try {
        const data = Cart.findOneAndUpdate({userId, productId})
        res.status(200).json("Cart Updated Successfully")
    } catch (error) {
        res.status(500).json({message:"Server error",error:error.message})
    }
}

exports.getCart = async(req,res)=>{
    const id = req.user.id
    try {
        let products = await Cart.find({userId:id}).populate('productId');        
        res.status(200).json(products)
    } catch (error) {
        res.status(200).json({message:"Server error",error:error.message})
    }
}