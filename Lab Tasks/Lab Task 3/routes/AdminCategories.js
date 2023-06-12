var express = require("express");
var router = express.Router();
var Category = require('../models/category.js');

router.get('/', async(req, res)=>{
     let cat = await Category.find();
     res.render('admin/categories', {cat});
    });

router.get('/add-category', function(req, res){
        var title = '';

        res.render('admin/AddCategory', {
            title : title,
    
        });
    });

router.post('/add-category', async(req, res)=>{
        req.checkBody('title', 'title must have value').notEmpty();
        
    
        var title = req.body.title;
        var slug = title;
    
        var errors = req.validationErrors();
    
    
    if(errors){
        console.log("errors");
        res.render('admin/AddCategory', {
            errors :errors,
            title : title,
            slug :slug,
    
        });
    } else{
                var cat = new Category({
                    title:title,
                    slug:slug,
                    
                });
                let c = await cat.save();
                res.redirect('/admin/categories')
                Category.find({})
                .then(categories => {
                  req.app.locals.categories = categories;
                })
                .catch(err => {
                  console.error(err);
                });
                
            }
    });


router.get('/edit-category/:id', async (req, res) => {
        try {
          const editCat = await Category.findById(req.params.id );
          if (!editCat) {
            // Page not found
            return res.status(404).send('Page not found');
          }
          res.render('admin/edit-category', { editCat });
        } catch (error) {
          // Handle the error here
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
      });

      router.post('/edit-category/:id', async (req, res) => {
        req.checkBody('title', 'Title must have a value').notEmpty();
      
        const title = req.body.title;
        const slug = title;
        const id = req.params.id;
      
        const errors = req.validationErrors();
      
        if (errors) {
          console.log(errors);
          res.render('admin/edit-category', {
            errors: errors,
            title: title,
            slug: slug,
            id: id,
          });
        } else {
          try {
            let category = await Category.findById(id);
      
            if (category) {
              category.title = title;
              category.slug = slug;
              // No need to set the 'id' property, as it is already part of the category object
      
              await category.save();
              res.redirect('/admin/categories/');
              Category.find({})
              .then(categories => {
                req.app.locals.categories = categories;
              })
              .catch(err => {
                console.error(err);
              });
            } else {
              console.log('Category not found');
              // Handle the case when the category is not found
              // For example, you could redirect to an error page or display a relevant message
              res.redirect('/admin/categories');
            }
          } catch (error) {
            console.log(error);
            // Handle any other errors that may occur during the database interaction
            // For example, you could redirect to an error page or display a relevant message
            res.redirect('/admin/categories');
          }
        }
      });

router.get('/delete-category/:id', async (req, res) => {
        try {
          let deleteCat = await Category.findByIdAndDelete(req.params.id);
          let cat = await Category.find();
          console.log(deleteCat);
          res.render('admin/categories', { cat });
          Category.find({})
          .then(categories => {
            req.app.locals.categories = categories;
          })
          .catch(err => {
            console.error(err);
          });
        } catch (error) {
          // Handle the error here
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
      });

    module.exports = router;