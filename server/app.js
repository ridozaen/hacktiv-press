const express = require('express')
const app = express();
require('dotenv').config();
const articlesRouter = require('./routes/articles');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const cors = require('cors');
const mongoose = require('mongoose')
const url = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds125381.mlab.com:25381/hacktiv-press_db`
const port = process.env.PORT || 3000;

mongoose.connect(url);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/articles', articlesRouter)
app.use('/api/login', loginRouter);
app.use('/api/register', registerRouter);

app.listen(port, ()=>{
    console.log(`server running on port ${port}`)
})

module.exports = {app};