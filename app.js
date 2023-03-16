const express = require('express');
const AppError = require('./utils/appError');
const blogRouter = require('./routes/blogRoutes');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

// Body parser, reading data from body into req.body
app.use(express.json({limit: '10kb'}));
app.use(express.urlencoded({extended: true, limit: '10kb'}));

app.use('/api/v1/blogs', blogRouter);

app.all('*', (req, res, next) => {
 next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
