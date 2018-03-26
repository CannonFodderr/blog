var express = require('express'),
    router  = express.Router(),
    mongoose    = require('mongoose'),
    expressSanitizer = require('express-sanitizer'),
    Post        = require('../models/post'),
    User        = require('../models/user'),
    comments    = require('../models/comment'),
    middleware  = require('../middleware');

router.get('/', function(req, res){
    res.redirect('/blog');
});

router.get('/blog', function(res, res){
    Post.find({}, function(err, allPosts){
        if(err){
            console.log(err);
            res.redirect('/login');
        } else {
            res.render('blog/index', {allPosts:allPosts});
        }
    })
});

router.post('/blog', middleware.isLoggedIn, function(req, res){
    req.body.post.body = req.sanitize(req.body.post.body);
    var title = req.body.post.title,
        description = req.body.post.description,
        body        = req.body.post.body,
        image       = req.body.post.image,
        author      = {
            id: req.user._id,
            username: req.user.username
        }
    var newPost = {title:title, description:description, body:body, image:image,author:author}
    Post.create(newPost, function(err, post){
        if(err){
            console.log(err);
            return res.redirect('/blog/new');
        } else {
            req.flash("success", "Published new post");
            res.redirect('/blog');
        }
    })
});

router.get('/blog/new', middleware.isLoggedIn, function(req, res){
    res.render('blog/new');
});

router.get('/blog/:id', function(req, res){
    Post.findById(req.params.id).populate("comments").exec(function(err, foundPost){
        if(err){
            console.log(err);
            res.redirect('back');
        } else {
            res.render('blog/show', {post: foundPost});
        }
    })
});

router.get('/blog/:id/edit', middleware.checkPostOwnership, function(req, res){
    Post.findById(req.params.id, function(err, foundPost){
        if(err){
            console.log(err);
            res.redirect('back');
        } else {
            res.render('blog/edit', {post: foundPost});
        }
    })
});

router.put('/blog/:id',middleware.checkPostOwnership, function(req, res){
    req.body.post.body = req.sanitize(req.body.post.body);
    var data = req.body.post;
    Post.findByIdAndUpdate(req.params.id, data, function(err, updatedPost){
        if(err){
            console.log(err);
            res.redirect('back');
        } else {
            req.flash("success", "Post updated!");
            res.redirect('/blog/' + req.params.id);
        }
    })
})

router.delete('/blog/:id',middleware.checkPostOwnership , function(req, res){
    Post.findByIdAndRemove(req.params.id, function(err, deletedPost){
        if(err){
            console.log(err);
            res.redirect('back');
        } else {
            res.redirect('/blog');
        }
    });
});

module.exports = router;
    
