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

const posts = [
 {
  id: 1,
  title: 'My First Blog Post',
  content:
   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut ligula eu tortor tincidunt sodales.',
 },
 {
  id: 2,
  title: 'My Second Blog Post',
  content:
   'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
 },
 {
  id: 3,
  title: 'My Third Blog Post',
  content:
   'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
 },
];

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
 res.render('pages/home', {posts: posts});
});

app.get('/home', (req, res) => {
 res.render('pages/home', {posts: posts});
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
