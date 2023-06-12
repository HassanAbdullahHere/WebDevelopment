const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Category = require('../models/category');
const fs = require('fs-extra');

router.get('/all', async (req, res) => {
  try {
    console.log('Success..................');
    const products = await Product.find().exec();
    res.render('ALLp', {
      title: 'All products',
      products: products
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/:category', async (req, res) => {
  try {
    const slug = req.params.category;
    const cat = await Category.findOne({ slug: slug });
    console.log('Success..................');
    const products = await Product.find({ category: cat.title }).exec();
    res.render('cat_products', {
      title: cat.title,
      products: products
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/:category/:product', async (req, res) => {
  try {
    const productSlug = req.params.product;
    const product = await Product.findOne({ slug: productSlug }).exec();
    
    if (!product) {
      console.log('Product not found:', productSlug);
      return res.status(404).send('Product not found');
    }

    const galleryDir = `public/product_images/${product._id}/gallery`;
    const galleryImage = await fs.readdir(galleryDir);
    
    res.render('product', {
      title: product.title,
      p: product,
      galleryImage: galleryImage
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
