const express = require("express");
const cors = require("cors");
const passport = require("passport");
const swaggerUi = require('swagger-ui-express');

const connectDB = require("./core/db/connection")
const Routes = require("./routes");
const {JWTStrategy} = require("./core/untils/passport-jwt-strategy");
const {swaggerDocument} = require("./swagger-setup")
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(passport.initialize());
passport.use(JWTStrategy());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(Routes);


connectDB()
    .then(_ => {
        app.listen(process.env.PORT || 3000, () => {
            console.log("Server started!!")
        })
    })

