const express = require('express');
const app = express();
const driversRouter = require('./routes/Driver'); 
var mongoose = require('mongoose');
var config = require('./config/database');


mongoose.connect(config.Database);
var db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error"));
db.once('open', function(){
    console.log("Connected to db");
});


app.use(express.json());
app.use(express.static('public'));

app.use('/api/drivers', driversRouter);

const port = 3000;
app.listen(port, () => {
  console.log('Server running on port' + port);
});
