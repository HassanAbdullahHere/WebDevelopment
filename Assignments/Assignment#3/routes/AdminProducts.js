var express = require("express");
var router = express.Router();
var Product = require('../models/product');
var mkdirp = require("mkdirp").mkdirp;
var fs = require("fs-extra");
var resizeImg = require("resize-img");

var Category = require('../models/category');


router.get('/', async(req, res)=>{
    let pro = await Product.find();
    let count = await Product.count();
    res.render('admin/products', {pro,count});
    });



router.get('/add-product', async(req, res)=>{
    var title = '';
    var desc = '';
    var price = '';

    let cats = await Category.find();
    res.render('admin/AddProduct', {
        title : title,
        desc:desc,
        categories: cats,
        price : price
    });
});

 router.post('/add-product', async(req, res)=>{

    var imageFile = typeof req.files.image !== 'undefined' ? req.files.image.name : "";
    req.checkBody('title', 'title must have value').notEmpty();
    req.checkBody('desc', 'description must have value').notEmpty();
    req.checkBody('price', 'price must have value').isDecimal();
    req.checkBody('image', "Upload Image").isImage(imageFile);

    var title = req.body.title;
    var slug = title;
    var desc = req.body.desc;
    var price = req.body.price;
    var category = req.body.category;

    var errors = req.validationErrors();

    let cats = await Category.find();

if(errors){
    console.log("errors");
    res.render('admin/AddProduct', {
        errors :errors,
        title : title,
        desc:desc,
        categories: cats,
        price : price


    });
} else{
            var price2 = parseFloat(price).toFixed(2);
            var pro = new Product({
                title:title,
                slug:slug,
                desc:desc,
                price:price2,
                category:category,
                image:imageFile
            });
            let p = await pro.save();
            const dir = `public/product_images/${p._id}`;
fs.mkdirSync(dir, { recursive: true }, (err) => {
  if (err) {
    console.error(err);
  }
});

const galleryDir = `public/product_images/${p._id}/gallery`;
fs.mkdirSync(galleryDir, { recursive: true }, (err) => {
  if (err) {
    console.error(err);
  }
});

const thumbsDir = `public/product_images/${p._id}/gallery/thumbs`;
fs.mkdirSync(thumbsDir, { recursive: true }, (err) => {
  if (err) {
    console.error(err);
  }
});

            if(imageFile != ""){
              var productImage = req.files.image;
              var path = 'public/product_images/' + pro._id + '/' + imageFile;
              productImage.mv(path, function(err){
                return console.log(err);
              })
            }
            res.redirect('/admin/products')
            
        }
});

router.get('/edit-product/:id', async (req, res) => {
    try {
      let cats = await Category.find();
      const editProduct = await Product.findById(req.params.id);
      if (!editProduct) {
        // Page not found
        return res.status(404).send('Prdouct not found');
      }
      var galleryDir = 'public/product_images/'+ editProduct._id ;
      console.log(galleryDir)
      let IMG = await fs.readdir(galleryDir);
      console.log(IMG);
      res.render('admin/edit-product', { editProduct,cats, IMG });
    } catch (error) {
      // Handle the error here
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  

router.get('/delete-product/:id', async (req, res) => {
    try {
      var id = req.params.id;
      var path = 'public/product_images/' + id;
      fs.remove(path);
      let count = await Product.count();
      let deleteProduct = await Product.findByIdAndDelete(req.params.id);
      let pro = await Product.find();
      console.log(deleteProduct);
      res.render('admin/products', { pro, count });
    } catch (error) {
      // Handle the error here
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

router.post('/edit-product/:id', async(req, res)=>{
  var imageFile = typeof req.files.image !== 'undefined' ? req.files.image.name : "";
  req.checkBody('title', 'title must have value').notEmpty();
  req.checkBody('desc', 'description must have value').notEmpty();
  req.checkBody('price', 'price must have value').isDecimal();
  req.checkBody('image', "Upload Image").isImage(imageFile);

  var title = req.body.title;
  var slug = title;
  var desc = req.body.desc;
  var price = req.body.price;
  var category = req.body.category;
  var pimage = req.body.pimage;
  var id = req.params.id;

  var errors = req.validationErrors();

  let cats = await Category.find();


if(errors){
    console.log("errors");
    res.render('admin/product/edit-product/'+ id);
} else{
        let P = await Product.findById(id);

        if(P){
            P.title= title;
            P.slug= slug;
            P.desc= desc;
            P.price= parseFloat(price).toFixed(2);
            P.category = category;
            if(imageFile != ''){
              P.image = imageFile;
            }
        }
        let p = await P.save();
        if(imageFile != ''){
          fs.remove('public/product_images/'+id+'/'+pimage);
          var productImage = req.files.image;
              var path = 'public/product_images/' + id + '/' + imageFile;
              productImage.mv(path, function(err){
                return console.log(err);
              })
        }

        res.redirect('/admin/products');
        
            
        }
});


//Exports
module.exports = router;