const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deliverySchema = new Schema({

//Buy for my self

  recipitionFirstName: { 
    type: String, 
    required: true,

 },

  recipitionLastName: { 
    type: String, 
    required: true, 

  },

  recipitionPhone: { 
  type: Number, 
  required: true, 

},

  recipitionAddress: { 
    type: String, 
    required: true, 
  
  },

  recipitionEmail: { 
    type: String, 
    required: true, 
  },

  deliveryType: { 
    type: String,
     required: true,
   },

  billingName: { 
    type: String,
    required: true,

  },

  billingAddress: { 
    type: String,
    required: true,
   },

  billingCity: {
    type: String, 
    required: true, 
   },

  billingPostcode:{ 
    type: Number, 
    required: true, 
   },

   //Send as a gift

   senderFirstName: { 
    type: String, 
    required: true,

 },

  senderLastName: { 
    type: String, 
    required: true,
     
  },

  senderPhone: { 
  type: Number, 
  required: true, 

},

  senderAddress: { 
    type: String, 
    required: true, 
  
  },

   recipitionFirstName: { 
    type: String, 
    required: true,

 },

  recipitionLastName: { 
    type: String, 
    required: true, 

  },

  recipitionPhone: { 
    type: Number, 
    required: true, 
  
  },

  recipitionAddress: { 
    type: String, 
    required: true, 
  
  },

  recipitionEmail: { 
    type: String, 
    required: true, 
  },

  deliveryType: { 
    type: String,
     required: true,
   },

  billingName: { 
    type: String,
    required: true,

  },

  billingAddress: { 
    type: String,
    required: true,
   },

  billingCity: {
    type: String, 
    required: true, 
   },

  billingPostcode:{ 
    type: Number, 
    required: true, 
   },

});

module.exports = mongoose.model(
    "deliveryModel",//file name
     deliverySchema //function name

    )
