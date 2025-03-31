const Delivery = require('../Model/deliveryModel');

//Buy for my self

// Insert delivery information
const insertDeliveryInfo = async (req, res) => {
    const {
      recipitionFirstName, recipitionLastName, recipitionPhone, recipitionAddress, recipitionEmail,
      deliveryType, billingName, billingAddress, billingCity, billingPostcode
    } = req.body;
  
    let delivery;
  
    try {
        delivery = new Delivery({
          recipitionFirstName, recipitionLastName, recipitionPhone, recipitionAddress, recipitionEmail,
          deliveryType, billingName, billingAddress, billingCity, billingPostcode
        });
  
        await delivery.save();
  
        if (!delivery) {
          return res.status(400).json({ message: "Failed to save delivery" });
        }
  
        return res.status(201).json(delivery); //  Success response
  
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error saving delivery" }); // Proper error handling
    }
  };
  

// Display all delivery records
const getAllDeliveries = async (req, res, next) => {

     let deliveries; //  Fix variable name (was "Users")
    
        // Get all deliveries
        try {
            deliveries = await Delivery.find();
        } catch (err) {
            console.log(err);
        }
    
        // Not found
        if (!deliveries) {
            return res.status(404).json({ message: "not found" });
        }
    
        // Display all deliveries
        return res.status(200).json({ deliveries });
    

};

//Get by Id
const getById = async (req, res, next) => {
    const id = req.params.id;

    let deliveries;

    try{
        deliveries = await Delivery.findById(id);
    }catch (err) {
        console.log(err);
    }
    //not available users
    if (!deliveries){
        return res.status(404).json({message:"Delivery Not Found"});
     }
     return res.status(200).json({deliveries});
    };

    //update info
    const updateDeliveryInfo = async (req, res) => {
        const id = req.params.id;
        const { recipitionFirstName, recipitionLastName, recipitionPhone, recipitionAddress, recipitionEmail, deliveryType, 
            billingName, billingAddress, billingCity, billingPostcode } = req.body;
    
        let delivery;
    
        try {
            delivery = await Delivery.findByIdAndUpdate(
                id, 
                { recipitionFirstName, recipitionLastName, recipitionPhone, recipitionAddress, recipitionEmail, deliveryType,
                     billingName, billingAddress, billingCity, billingPostcode },
                
            );
            delivery = await delivery.save();
    
            if (!delivery) {
                return res.status(404).json({ message: "Unable to Update Delivery Details" });
            }
    
            return res.status(200).json({ delivery });
    
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Server Error" });
        }
    };
    

//Delete User Details
const deleteDeliveryInfo = async (req, res, next) => {
    const id = req.params.id;

    let delivery;

    try{
        delivery = await Delivery.findByIdAndDelete(id)
    }catch (err) {
        console.log(err);
    }
    //not available users
    if (!delivery){
        return res.status(404).json({message:"Unable to Delete User Details"});
     }
     return res.status(200).json({delivery});
    };

    // Exports

    exports.insertDeliveryInfo = insertDeliveryInfo;
    exports.getAllDeliveries = getAllDeliveries;
    exports.getById = getById;
    exports.updateDeliveryInfo = updateDeliveryInfo;
    exports.deleteDeliveryInfo = deleteDeliveryInfo;


    //Send as a gift

    // Insert delivery information
const addDeliveryInfo = async (req, res) => {
    const {
      senderFirstName, senderLastName, senderPhone, senderAddress, recipitionFirstName, recipitionLastName, recipitionPhone, recipitionAddress, recipitionEmail,
      deliveryType, billingName, billingAddress, billingCity, billingPostcode
    } = req.body;
  
    let delivery;
  
    try {
        delivery = new Delivery({
          senderFirstName, senderLastName, senderPhone, senderAddress, recipitionFirstName, recipitionLastName, recipitionPhone, recipitionAddress, recipitionEmail,
          deliveryType, billingName, billingAddress, billingCity, billingPostcode
        });
  
        await delivery.save();
  
        if (!delivery) {
          return res.status(400).json({ message: "Failed to save delivery" });
        }
  
        return res.status(201).json(delivery); //  Success response
  
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error saving delivery" }); // Proper error handling
    }
  };
  

// Display all delivery records
const displayAllDeliveries= async (req, res, next) => {

     let deliveries; //  Fix variable name (was "Users")
    
        // Get all deliveries
        try {
            deliveries = await Delivery.find();
        } catch (err) {
            console.log(err);
        }
    
        // Not found
        if (!deliveries) {
            return res.status(404).json({ message: "not found" });
        }
    
        // Display all deliveries
        return res.status(200).json({ deliveries });
    

};

//Get by Id
const getDeliveryID = async (req, res, next) => {
    const id = req.params.id;

    let deliveries;

    try{
        deliveries = await Delivery.findById(id);
    }catch (err) {
        console.log(err);
    }
    //not available users
    if (!deliveries){
        return res.status(404).json({message:"Delivery Not Found"});
     }
     return res.status(200).json({deliveries});
    };

    //update info
    const updateInfo = async (req, res) => {
        const id = req.params.id;
        const { recipitionFirstName, recipitionLastName, recipitionPhone, recipitionAddress, recipitionEmail, deliveryType, 
            billingName, billingAddress, billingCity, billingPostcode } = req.body;
    
        let delivery;
    
        try {
            delivery = await Delivery.findByIdAndUpdate(
                id, 
                { recipitionFirstName, recipitionLastName, recipitionPhone, recipitionAddress, recipitionEmail, deliveryType,
                     billingName, billingAddress, billingCity, billingPostcode },
                
            );
            delivery = await delivery.save();
    
            if (!delivery) {
                return res.status(404).json({ message: "Unable to Update Delivery Details" });
            }
    
            return res.status(200).json({ delivery });
    
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Server Error" });
        }
    };
    

//Delete User Details
const deleteInfo = async (req, res, next) => {
    const id = req.params.id;

    let delivery;

    try{
        delivery = await Delivery.findByIdAndDelete(id)
    }catch (err) {
        console.log(err);
    }
    //not available users
    if (!delivery){
        return res.status(404).json({message:"Unable to Delete User Details"});
     }
     return res.status(200).json({delivery});
    };

    
// Exports

exports.addDeliveryInfo = addDeliveryInfo;
exports.displayAllDeliveries = displayAllDeliveries;
exports.getDeliveryID = getDeliveryID;
exports.updateInfo = updateInfo;
exports.deleteInfo = deleteInfo;

