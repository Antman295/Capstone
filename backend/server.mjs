// Imports
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser'
import connectDB from './db/conn.mjs';
import recepieRoutes from './routes/receipesRoutes.mjs'
import cors from 'cors';
import morgan from 'morgan';

const app = express();
dotenv.config();
let PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({extended: true}));

// Routes
app.use('/api/recepies', recepieRoutes);


// Listener
app.listen(PORT, () => {
    console.log(`${PORT} worked. You're welcome!`)
})