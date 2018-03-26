var express = require('express'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    passportLocalMongoose = require('passport-local-mongoose');

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    posts: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    },
    comments: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);