const express = require('express');
const crudHandler = require('./routerHandler/crudHandler');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

//server connection
mongoose.connect('mongodb://localhost:27017/crud_system', {family: 4})
    .then(() => {
        console.log("server connected successfully");
    })
    .catch(() => {
        console.log('server connection failed');
    })


app.use('/crud', crudHandler);


app.listen(5000, () => {
    console.log('Server is running in port 5000');
});