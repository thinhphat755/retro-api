const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
//const usersRouter = require('./routes/users');
const boardsRouter = require('./components/boards/index');
const tagsRouter = require('./components/tags/index');
const usersRouter = require('./components/users/index');
const authRouter = require('./components/auth/index');

const app = express();

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");

//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

//   res.header("Access-Control-Allow-Credentials", true);

//   next();
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(session({
  secret: "0",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
// app.use(session({
//   secret: "0",
// }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/boards', boardsRouter);
app.use('/tags', tagsRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

// app.use(async (req, res, next) => {
//   res.locals.user = req.session.user;
//   next();
// })

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;
