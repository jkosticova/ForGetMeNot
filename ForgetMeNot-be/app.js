var express = require('express');
const { sequelize, connectDB } = require("./sequelize");
const cors = require('cors');

const User = require("./models/user");

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');

var app = express();
// app.use(express.json());

connectDB();
sequelize.sync({ force: false }) // Change to true to drop & recreate tables
    .then(() => console.log("Tables have been created."))
    .catch(err => console.error("Error creating tables:", err));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use(cors({
    origin: 'http://localhost:5173',
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);

module.exports = app;
