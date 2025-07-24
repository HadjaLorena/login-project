import express from 'express';
import mongoose from 'mongoose';
import {uri} from './config/db.js';
import {PORT} from './settings.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';

const app = express();

app.use(express.json());

// Chamadas das rotas
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
    res.send('API is running');
});

mongoose
.connect(uri)
.then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
        console.log(`App is listening to port: ${PORT}`);
    });
})
.catch((error) => {
    console.log(error);
});