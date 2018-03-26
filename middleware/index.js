var middlewareObj   = {},
    Post            = require('../models/post'),
    Comment         = require('../models/comment');

middlewareObj.checkPostOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Post.findById(req.params.id, function(err, foundPost){
            if(foundPost.author.id.equals(req.user._id)){
                next();
            } else {
                req.flash("error", "Edit you won posts...");
                res.redirect('back');
            }
        })
    } else {
        req.flash("error", "Please login first");
        res.redirect('back')
    }
}

middlewareObj.checkCommentAuth = function (req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.commentID, function(err, comment){
            if(comment.author.id.equals(req.user._id)){
                next();
            } else {
                req.flash("error", "Edit your own comments...")
                res.redirect('back');
            }
        })
    } else {
        req.flash("error", "Please login first");
        res.redirect('/login');
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        next();
    } else {
        req.flash("error", "Please login first");
        res.redirect('back');
    }
};


module.exports = middlewareObj;