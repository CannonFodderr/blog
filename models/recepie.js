var express = require('express'),
    mongoose = require('mongoose');


var recepieSchema = ({
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    date: { type: Date, default: Date.now },
    ingridients: [],
    steps: [],
    body: String,
    comments: [
        {
            id:  mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

module.exports = mongoose.model('Recepie', recepieSchema);