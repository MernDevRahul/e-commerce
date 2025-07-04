const express = require('express');
const { getOrder, createOrder } = require('../controllers/orderController');
const verifyToken = require("../middleware/authMiddleware")

const router = express.Router();

router.post("/create", verifyToken,createOrder)
router.get("/get", verifyToken,getOrder)

module.exports = router