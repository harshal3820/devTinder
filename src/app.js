const express = require('express');
const { connectDB } = require('./config/db');
const User = require('./models/user')
const app = express();
const { validateSignUpData } = require('./utils/validation');
const bcrypt = require('bcrypt');
const coookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { userAuth } = require('./middlewares/auth');

app.use(express.json()); //convert json data into js object
app.use(coookieParser());

app.post("/signup", async (req, res) => {

    try {
        //validation of data
        validateSignUpData(req);

        //Encrypt the password
        const { firstName, lastName, emailId, password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);
        console.log("passwordHash:", passwordHash);

        // creating a new instance of an user model
        const user = new User({ firstName, lastName, emailId, password: passwordHash });
        await user.save();
        res.send("USer added successfully");
    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
})

app.post("/login", async (req, res) => {

    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            throw new Error("Invalid credentials");
        }

        const isPasswordValid = await user.validatePassword(password);
        if (!isPasswordValid) {
            throw new Error("Invalid credentials");
        } else {
            const token = await user.getJWT();
            res.cookie("token", token,{expires: new Date(Date.now() + 8 * 3600000),});
            res.send("Login Successful!!!");
        }

    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
})

app.get("/profile", userAuth, async (req, res) => {

    try {
        const user = req.user;
        res.send(user);
    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
})

app.post("/sendConnectionRequest", userAuth, async(req, res) => {
    const user = req.user;

    console.log(user.firstName + " is Sending connection request");

    res.send(user.firstName + " Sent the connection request successfully");
})


connectDB()
    .then(() => {
        console.log("Database connected successfully");
        app.listen(7000, () => {
            console.log('Server is running on port 7000');
        });
    })
    .catch((err) => {
        console.error("Database connection failed", err);
    });


