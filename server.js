
import express from 'express';
import cors from 'cors';
import colors from 'colors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

import userRoutes from './routes/userRoutes.js';
import blogRoutes from './routes/blogRoutes.js';

//env config
dotenv.config();

//connect mongoDb
connectDB();

//rest object
const app = express();

//Middlewares
app.use(cors()); 
app.use(express.json());
app.use(morgan('dev'));

// Example code for setting cache-control headers in Express.js
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-cache, no-store');
    next();
  });
  

app.use('/api/v1/user', userRoutes);
app.use("/api/v1/blog", blogRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=>{
    console.log(`Servrer is Running for ${process.env.DEV_MODE} at port ${PORT}`.bgRed.white );
})