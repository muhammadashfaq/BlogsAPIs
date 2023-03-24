const express = require('express');
const AppError = require('./utils/appError');
const blogRouter = require('./routes/blogRoutes');
const userRouter = require('./routes/userRoutes');
const cookieParser = require('cookie-parser');
const globalErrorHandler = require('./controllers/errorController');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');

const app = express();

app.use(express.json({limit: '10kb'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({extended: true, limit: '10kb'}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
 res.render('pages/home');
});

app.get('/home', (req, res) => {
 res.render('pages/home');
});

app.get('/login', (req, res) => {
 res.render('pages/login');
});

app.get('/signup', (req, res) => {
 res.render('pages/signup');
});

app.use('/api/v1/blogs', blogRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, _res, next) => {
 next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
