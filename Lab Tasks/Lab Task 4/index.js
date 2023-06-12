var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var config = require('./config/database');
var pages = require('./routes/pages.js');
var prod = require('./routes/products.js');
var cart = require('./routes/cart');
var AdminPages = require('./routes/AdminPages.js');
var AdminCategories = require('./routes/AdminCategories.js')
var AdminProducts = require('./routes/AdminProducts.js')
var bodyParser = require('body-parser');
var session = require('express-session');
var expressValidator = require('express-validator');
var FileUpload = require('express-fileupload');
var passport = require('passport');

//Connect to DB
mongoose.connect(config.Database);
var db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error"));
db.once('open', function(){
    console.log("Connected to db");
});

//init app
var app = express();

app.locals.errors = null;
var Page = require('./models/page');
var Category = require('./models/category');
var Product = require('./models/product');

//View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Public Folders
app.use(express.static(path.join(__dirname, "public")));

//Middle-ware
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//File-Upload Middleware
app.use(FileUpload());

//Session Middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))

//validator Middleware
app.use(expressValidator({
    errorFormatter: function(param, mag, value){
        var namespace = param.split('.'),
        root = namespace.shift(),
        formParam = root;

        while(namespace.length){
            formParam += '[' + namespace.shift() + ']';
        }
        return{
            param : formParam,
            mag : mag,
            value : value
        };
    },
    customValidators:{
        isImage: function(value, filename){
            var ex = (path.extname(filename)).toLowerCase();
            switch(ex){
                case '.jpg':
                    return '.jpg';
                case '.jpeg':
                    return '.jpeg'; 
                case '.png':
                    return '.png'; 
                case '':
                    return '.jpg'; 
                default:
                    return false; 
            }
        }
    }
}));

Page.find({})
  .then(pages => {
    app.locals.HeaderPages = pages;
  })
  .catch(err => {
    console.error(err);
  });

  Category.find({})
  .then(categories => {
    app.locals.categories = categories;
  })
  .catch(err => {
    console.error(err);
  });

  Product.find({})
  .then(products => {
    app.locals.products = products;
  })
  .catch(err => {
    console.error(err);
  });

  require('./config/password')(passport);

app.use(passport.initialize());
app.use(passport.session());

app.get('*', function(req,res,next){
  res.locals.cart = req.session.cart;
  next();
})
 
app.use('/', pages);
app.use('/products', prod);
app.use('/admin/pages', AdminPages);
app.use('/admin/categories', AdminCategories);
app.use('/admin/products', AdminProducts);
app.use('/cart', cart);

//Server Port
var port = 5000;
app.listen(port, function(){
    console.log("Server Started at port: " + port);
});
