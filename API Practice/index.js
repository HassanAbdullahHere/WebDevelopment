const express = require('express')
const app = express();

const route = require('./routes')

app.use('/api/v1',route)


app.listen(5000,console.log("Your server is running "))