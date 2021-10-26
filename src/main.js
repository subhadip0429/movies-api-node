const express = require("express");
const cors = require("cors");
const passport = require("passport");

const connectDB = require("./core/db/connection")
const Routes = require("./routes");
const {JWTStrategy} = require("./core/untils/passport-jwt-strategy");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(passport.initialize());
passport.use(JWTStrategy());
app.use(Routes);


connectDB()
    .then(_ => {
        app.listen(process.env.APP_PORT, () => {
            console.log("Server started!!")
        })
    })

