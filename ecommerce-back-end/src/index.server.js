const express = require('express');
const env = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const cors = require('cors');

//route
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');

//environment variable
env.config();
//mongodb connection
//mongodb+srv://admin-sachin:<password>@cluster0.a2qab.mongodb.net/<dbname>?retryWrites=true&w=majority
mongoose.connect(
    "mongodb://localhost:27017/ecommerceDB", 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
    ).then(() => {
    console.log('My Database connected');
});

app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')));
app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);

app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);

});