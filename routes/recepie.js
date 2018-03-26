var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    User    = require('../models/user'),
    Comment = require('../models/comment');

router.get('/recepie', function(req, res){
    res.render('recepie/index');
});

router.get('/recepie/new', function(req, res){
    res.render('recepie/new');
})
router.post('/recepie', function(req, res){
    res.send('I will submit a new recepie');
});

router.get('/recepie/:id', function(req, res){
    res.render('recepie/show');
});


module.exports = router;