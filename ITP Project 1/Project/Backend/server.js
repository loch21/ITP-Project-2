const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const orderRoutes = require('./Routes/orderRoute');
const paymentRoutes = require('./routes/paymentRoutes');
const ProductRoutes = require('./Routes/product');


const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect('mongodb://localhost:27017/potted_plants', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


app.use('/api', orderRoutes);
app.use('/api', paymentRoutes);
app.use('/api', ProductRoutes);


app.listen(5000, () => console.log('Server running on port 5000'));





