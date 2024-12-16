const express = require('express');
const userRouter = require('./routes/user.routes');
const dotenv = require('dotenv');
dotenv.config();

const connectToDB = require('./config/db');
connectToDB();

const cookieParser = require('cookie-parser');

// Initialize the Express app
const app = express();

// Middleware to parse cookies before other middlewares
app.use(cookieParser());


const indexRouter = require('./routes/index.routes');






// Middleware to parse JSON request bodies
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', indexRouter);
app.use('/user', userRouter);

app.get('/', function(req, res) {
    res.render('home');
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
