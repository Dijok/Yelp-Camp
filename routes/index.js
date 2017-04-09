var expres  =   require("express");
var router  =   expres.Router();
var passport = require("passport");
var User = require("../models/user");

//Root route
router.get("/", function(req, res){
    res.render("landing");
}); 

//Register form route
router.get("/register", function(req, res){
   res.render("register", {page: 'register'}); 
});

//Handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register", {error: err.message});
        }
        passport.authenticate("local")(req, res, function(){
           req.flash("success", "Successfully Signed Up! Nice to meet you " + req.body.username);
           res.redirect("/campgrounds"); 
        });
    });
});

//Login form route
//show login form
router.get("/login", function(req, res){
   res.render("login", {page: 'login'}); 
});

//Handles login logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect:"/campgrounds",
        failureRedirect:"/login"
    }), function(req, res){
});
//Logout route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/campgrounds");
});



module.exports = router;