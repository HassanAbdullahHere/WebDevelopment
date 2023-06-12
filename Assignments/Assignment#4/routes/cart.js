const express = require('express');
const router = express.Router();
const Product = require('../models/product');



router.get('/add/:product', async (req, res) => {
    try {
      var slug = req.params.product;
      console.log("Successsss..................");
      let product = await Product.findOne({ slug: slug });
      console.log(product.title);
      if (typeof req.session.cart == 'undefined') {
        req.session.cart = [];
        console.log("pass");
        req.session.cart.push({
          title: slug,
          qty: 1,
          price: parseFloat(product.price).toFixed(2),
          image: '/product_images/' + product._id + '/' + product.image
        })
        console.log(req.session.cart.length, req.session.cart);
      } else {
        var cart = req.session.cart;
        var newItem = true;
        for (var i = 0; i < cart.length; i++) {
          if (cart[i].title == slug) {
            cart[i].qty++;
            newItem = false;
            break;
          }
        }
        if (newItem) {
          
          cart.push({
            title: slug,
            qty: 1,
            price: parseFloat(product.price).toFixed(2),
            image: '/product_images/' + product._id + '/' + product.image
          })
        }
        console.log(cart);
      }
      res.redirect('back');
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });
 

  router.get('/checkout', function(req,res){
    res.render('checkout',{
        title: "Checkout",
        cart: req.session.cart
    })
  })

  router.get('/update/:product', function(req,res){
    var slug = req.params.product;
    var cart = req.session.cart;
    var action = req.query.action;

    for (var i =0; i < cart.length; i++){
        if(cart[i].title == slug){
            switch (action){
                case 'add':
                    cart[i].qty++;
                    break;
                case 'remove':
                    cart[i].qty--; 
                    if(cart[i].qty < 1) cart.splice(i,1);
                    if(cart.length == 0) delete req.session.cart;
                    break;
                case 'clear':
                    cart.splice(i,1);
                    if(cart.length == 0) delete req.session.cart;
                    break;
                default:
                    console.log('not updated');
                    break;
            }
            break;
        }
    }
    res.redirect('/cart/checkout');
    
  })


  router.get('/clear', function(req,res){
    delete req.session.cart;
    res.redirect('/cart/checkout');
  })
  

  
  

module.exports = router;
