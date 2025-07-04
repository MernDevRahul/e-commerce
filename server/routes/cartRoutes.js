const express = require('express');
const { getCart, addToCart, updateCart, removeFromCart, removeById } = require('../controllers/cartController');
const verifyToken = require("../middleware/authMiddleware")
const router = express.Router()

router.get("/get", verifyToken,getCart)
router.post("/add", verifyToken,addToCart)
router.put("/update/:id", verifyToken,updateCart);
router.delete('/remove', verifyToken,removeFromCart)
router.delete('/remove/:id', verifyToken,removeById)


module.exports = router