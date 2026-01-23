require("dotenv").config();
const express = require('express');
const { connectDB } = require('./config/db');
const app = express();
const coookieParser = require('cookie-parser');
const cors = require('cors');
const cronjob = require('./utils/cronjob');


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json()); //convert json data into js object
app.use(coookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter =  require("./routes/request");
const UserRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", UserRouter)


connectDB()
    .then(() => {
        console.log("Database connected successfully");
        app.listen(process.env.PORT, () => {
            console.log('Server is running on port 7000');
        });
    })
    .catch((err) => {
        console.error("Database connection failed", err);
    });


