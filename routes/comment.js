var express = require('express'),
    router  = express.Router(),
    expressSanitizer = require('express-sanitizer'),
    mongoose    = require('mongoose'),
    Comment     = require('../models/comment'),
    Post        = require('../models/post'),
    middleware  = require('../middleware');

router.get('/blog/:id/comment', middleware.isLoggedIn, function(req, res){
    Post.findById(req.params.id, function(err, foundPost){
        if(err){
            res.redirect('back');
        } else {
            res.render('comments/new', {post: foundPost});
        }
    })
    
});

router.post('/blog/:id', middleware.isLoggedIn, function(req, res){
    req.body.comment.body = req.sanitize(req.body.comment.body);
    var author = { id: req.user.id, username: req.user.username};
    var newComment = { author: author, body: req.body.comment.body};
    Comment.create(newComment, function(err, createdComment){
        if(err){
            console.log(err);
            res.redirect('back');
        } else {
            Post.findById(req.params.id, function(err, foundPost){
                if(err){
                    console.log(err);
                    res.redirect('back');
                } else {
                    foundPost.comments.push(createdComment);
                    foundPost.save();
                    res.redirect('/blog/' + req.params.id);
                }
            })
            
        }
    });
});

router.get('/blog/:id/comments/:commentID/edit',middleware.checkCommentAuth, function(req, res){
    Comment.findById(req.params.commentID, function(err, foundComment){
        if(err){
            console.log(err);
            res.redirect('back');
        } else {
            res.render('comments/edit', {post_id: req.params.id, comment: foundComment});
        }
    });
});

router.put('/blog/:id/comments/:commentID',middleware.checkCommentAuth, function(req, res){
    Comment.findByIdAndUpdate(req.params.commentID, req.body.comment, function(err, updatedComment){
        if(err){
            console.log(err);
            res.redirect('back');
        } else {
            req.flash("success", "Updated comment!");
            res.redirect('/blog/' + req.params.id);
        }
    });
});

router.delete('/blog/:id/comments/:commentID',middleware.checkCommentAuth, function(req, res){
    Comment.findByIdAndRemove(req.params.commentID, function(err){
        if(err){
            console.log(err);
            res.redirect('back');
        } else {
            res.redirect('/blog/' + req.params.id);
        }
    });
});

module.exports = router;