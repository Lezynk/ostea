//news routes for Ostea

//call to external libraries
var express     = require('express'),
    router      = express.Router(),
    passport    = require("passport"),
    User        = require("../models/user"),
    New         = require("../models/news"),
    middleware  = require("../middleware");
    
//---------------
//    ROUTES
//---------------

//NEW - Get News Form
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("news/new", {url: 'Nouvelle Actualite'}); 
});

//NEW - Post News
router.post("/", middleware.isLoggedIn, function(req, res){
    // Create a new news and save
    New.create(req.body.news, function(err, newlyCreated){
        if(err){
            console.log(err);
            res.redirect("/");
        } else {
            //redirect back to news page
            console.log(newlyCreated);
            res.redirect("/");
        }
    });
});

//EDIT - Get News Form
router.get("/:id/edit", middleware.isLoggedIn, function(req, res){
    New.findById(req.params.id, function(err, foundNews){
        if(err){
           console.log(err);
           res.redirect("/");
        } else {
            res.render("news/edit", {newz: foundNews, url: 'Editer Actualite'});
        }
    });
});

//UPDATE - Put News
router.put("/:id", middleware.isLoggedIn, function(req, res){
    // find and update the correct news
    New.findByIdAndUpdate(req.params.id, req.body.news, function(err, updatedNews){
       if(err){
           console.log(err);
           res.redirect("/");
       } else {
           //redirect landing
           res.redirect("/");
       }
    });
});

//DESTROY - Delete News
router.delete("/:id", middleware.isLoggedIn, function(req, res){
   New.findByIdAndRemove(req.params.id, function(err){
      if(err){
          console.log(err);
          res.redirect("/");
      } else {
          res.redirect("/");
      }
   });
});

//export routes
module.exports = router;