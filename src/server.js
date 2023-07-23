const express = require("express")
const dbConnection = require("./config/database_config");
const env = require("dotenv");
env.config({path: "./config.env"})
const bodyParser = require("body-parser");
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const globalError = require("./middlewere/error_handle");
const {ApiError} = require("./utils/response_handel/error_handeler");
const mountRoutes = require("./app/rout_index");
const {json, urlencoded} = require("body-parser");
const {Sequelize} = require("sequelize");
const app = express()

app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(json());
app.use(urlencoded({
    extended: false
}));

// Mount Routes
dbConnection.authenticate().then(_ => console.log("connected to db")).catch(e => console.log(e))

app.use(cors())


// compress all responses
app.use(compression());


// Middlewares
app.use(express.json({limit: '5M'}));


// Limit each IP to 100 requests per `window` (here, per 15 minutes)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, message: 'Too many accounts created from this IP, please try again after an hour',
});

app.use('/api', limiter);

app.all('*', (req, res, next) => {
    next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

app.use(globalError);

app.listen(process.env.PORT, () => {
    console.log(`App running : http://localhost:8000/`);
})
