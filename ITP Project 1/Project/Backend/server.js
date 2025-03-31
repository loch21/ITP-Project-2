const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const orderRoutes = require('./Routes/orderRoute');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/potted_plants', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use('/api', orderRoutes);
app.use('/api', paymentRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
