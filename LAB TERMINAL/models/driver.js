var mongoose = require('mongoose');

var DriverSchema= mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
        
    },
    vehicle: {
        type: String,
        required: true
    }
});

var Driver  = module.exports = mongoose.model('Driver', DriverSchema);