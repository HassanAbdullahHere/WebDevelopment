var express = require("express");
var router = express.Router();
var Page = require('../models/page');

router.get('/', async function(req, res) {
  try {
    var slug = 'home';

    let page = await Page.findOne({ slug: slug }).exec();
    res.render('Main', {
      title: page.title,
      content: page.content
    });
  } catch (err) {
    console.error(err);
    res.render('Main', {
      title: 'Error',
      content: 'An error occurred while fetching the page.'
    });
  }
});

router.get('/:slug', async function(req, res) {
  try {
    var slug = req.params.slug;

    let page = await Page.findOne({ slug: slug }).exec();
    res.render('Main', {
      title: page.title,
      content: page.content
    });
  } catch (err) {
    console.error(err);
    res.render('Main', {
      title: 'Error',
      content: 'An error occurred while fetching the page.'
    });
  }
});

//Exports
module.exports = router;
