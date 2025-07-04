const express = require('express');
const { getCart, addToCart, updateCart, removeFromCart } = require('../controllers/cartController');
const verifyToken = require("../middleware/authMiddleware")
const router = express.Router()

router.get("/get", verifyToken,getCart)
router.post("/add", verifyToken,addToCart)
router.put("/update/:id", verifyToken,updateCart);
router.delete('/remove', verifyToken,removeFromCart)


module.exports = router