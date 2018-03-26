var express = require('express'),
    mongoose = require('mongoose'),
    User = require('./user'),
    Comment = require('./comment');

var postSchema = mongoose.Schema({
    title: String,
    description: String,
    image: String,
    body: String,
    date: {
        type: Date, default: Date.now
    },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
});

module.exports = mongoose.model("Post", postSchema);