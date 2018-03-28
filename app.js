var express                 = require('express'),
    app                     = express(),
    router                  = express.Router(({mergeParams: true})),
    bodyParser              = require('body-parser'),
    mongoose                = require('mongoose'),
    expressSanitizer        = require('express-sanitizer'),
    passport                = require('passport'),
    LocalStrategy           = require('passport-local'),
    passportLocalMongoose   = require('passport-local-mongoose'),
    methodOverride          = require('method-override'),
    User                    = require('./models/user'),
    Post                    = require('./models/post'),
    Comment                 = require('./models/comment'),
    flash                   = require('connect-flash'),
    port                    = process.env.port || 8080,
    ip                      = process.env.ip;

var authRoutes      = require('./routes/auth'),
    postRoutes      = require('./routes/index'),
    commentRoutes   = require('./routes/comment'),
    recepieRoutes   = require('./routes/recepie');

// ====================
//  Connect to mongoose
// ====================
// mongoose.connect('mongodb://localhost/cooking');
mongoose.connect('mongodb://idan:beta@ds121889.mlab.com:21889/blogapp');
// ====================
//  App config
// ===================
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(require('express-session')({
    secret: "Kiss the cook",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
app.use(expressSanitizer());
app.use(flash());
// =====================
//  Auth Config
// =====================
passport.use( new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(authRoutes);
app.use(postRoutes);
app.use(commentRoutes);
app.use(recepieRoutes);

app.listen(port,ip, function(req, res){
    console.log('Server is serving...');
});