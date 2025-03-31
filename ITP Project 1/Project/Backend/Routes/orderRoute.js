const express = require('express');
const {createOrder, getOrderById } = require('../Controllers/orderControllers');


const router = express.Router();

router.post('/', createOrder);
router.get('/:id' , getOrderById);

module.exports = router;