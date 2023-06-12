var express = require("express");
var router = express.Router();
var Page = require('../models/page');

router.get('/', async(req, res)=>{
    let b = await Page.find();
    res.render('admin/pages', {b});
    });



router.get('/add-page', function(req, res){
    var title = '';
    var slug = '';
    var content = '';

    res.render('admin/AddPage', {
        title : title,
        slug :slug,
        content : content

    });
});

 router.post('/add-page', async(req, res)=>{
    req.checkBody('title', 'title must have value').notEmpty();
    req.checkBody('content', 'content must have value').notEmpty();

    var title = req.body.title;
    var slug = req.body.slug;
    if (slug == '') slug = title;
    var content = req.body.content;

    var errors = req.validationErrors();


if(errors){
    console.log("errors");
    res.render('admin/AddPage', {
        errors :errors,
        title : title,
        slug :slug,
        content : content

    });
} else{
            var page = new Page({
                title:title,
                slug:slug,
                content:content,
                sorting:100
            });
            let p = await page.save();
            res.redirect('/admin/pages')
            
        }
});

router.get('/edit-page/:id', async (req, res) => {
    try {
      const editPage = await Page.findById(req.params.id);
      if (!editPage) {
        // Page not found
        return res.status(404).send('Page not found');
      }
      res.render('admin/edit-page', { editPage });
    } catch (error) {
      // Handle the error here
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  

router.get('/delete-page/:id', async (req, res) => {
    try {
      let deletePage = await Page.findByIdAndDelete(req.params.id);
      let b = await Page.find();
      console.log(deletePage);
      res.render('admin/pages', { b });
    } catch (error) {
      // Handle the error here
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

router.post('/edit-page/:id', async(req, res)=>{
    req.checkBody('title', 'title must have value').notEmpty();
    req.checkBody('content', 'content must have value').notEmpty();

    var title = req.body.title;
    var slug = req.body.slug;
    if (slug == '') slug = title;
    var content = req.body.content;
    var id = req.params.id

    var errors = req.validationErrors();


if(errors){
    console.log("errors");
    res.render('admin/edit-page', {
        errors :errors,
        title : title,
        slug :slug,
        content : content

    });
} else{
        let P = await Page.findById(id);

        if(P){
            P.title= title;
            P.slug= slug;
            P.content= content;
        }
        let p = await P.save();
        res.redirect('/admin/pages/edit-page/' +id)
        
            
        }
});


//Exports
module.exports = router;