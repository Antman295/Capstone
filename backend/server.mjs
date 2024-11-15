// Imports
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser'

const app = express();
dotenv.config();
let PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({extended: true}));
// Routes

// Listener
app.listen(PORT, () => {
    console.log(`${PORT} worked. You're welcome!`)
})