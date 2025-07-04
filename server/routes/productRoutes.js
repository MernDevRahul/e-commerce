const express = require('express');
const { addProduct, updateProduct, getProducts } = require('../controllers/productController');
const verifyToken = require('../middleware/authMiddleware')
const router = express.Router();

router.post('/create', verifyToken,addProduct);
router.put('/update/:id', verifyToken,updateProduct);
router.get('/get', verifyToken,getProducts);

module.exports = router