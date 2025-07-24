import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import {uri} from './config/db.js';
import {PORT} from './settings.js';

const app = express();

app.use(express.json());

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