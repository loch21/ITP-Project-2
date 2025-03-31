const express = require('express');
const router = express.Router();

// Insert Model
const Delivery = require("../Model/deliveryModel");

// Insert Controller
const deliveryController = require("../Controllers/deliveryController"); //  Fix spelling

//Route of Buy for myslef
router.post('/', deliveryController.insertDeliveryInfo); //fix naming
router.get('/', deliveryController.getAllDeliveries); 
router.get("/:id", deliveryController.getById);
router.put("/:id",deliveryController.updateDeliveryInfo);
router.delete("/:id", deliveryController.deleteDeliveryInfo);

//Route of Send as a gift
router.post('/', deliveryController.addDeliveryInfo); //fix naming
router.get('/', deliveryController.displayAllDeliveries); 
router.get("/:id", deliveryController.getDeliveryID);
router.put("/:id",deliveryController.updateInfo);
router.delete("/:id", deliveryController.deleteInfo);

//Export
module.exports = router;
