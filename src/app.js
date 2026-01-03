const express = require('express');
const { connectDB } = require('./config/db');
const User = require('./models/user')
const app = express();
const { validateSignUpData } = require('./utils/validation');
const bcrypt = require('bcrypt');
const coookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

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

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid credentials");
        } else {
            const token = await jwt.sign({ _id: user._id }, "devTinder$23");
            res.cookie("token", token);
            res.send("Login Successful!!!");
        }

    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
})

app.get("/profile", async (req, res) => {

    try {
        const cookies = req.cookies;
        const { token } = cookies;
        if (!token) {
            throw new Error("Token is not valid");
        }

        const decodedMessage = await jwt.verify(token, "devTinder$23");
        const { _id } = decodedMessage;

        const user = await User.findById(_id);
        if (!user) {
            throw new Error("User not found");
        }


        res.send(user);
    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
})

//get user by emailId
app.get("/user", async (req, res) => {

    try {
        const userEmail = req.body.emailId;
        const user = await User.find({ "emailId": userEmail });

        if (user.length === 0) {
            res.send("User not found");
        } else {
            res.send(user);
        }
    } catch (e) {
        console.error("Something went wrong");
    }

})

// FEED API - GET/feed - get all the users from the database
app.get("/feed", async (req, res) => {

    try {
        const users = await User.find({});
        res.send(users);
    } catch (e) {
        console.error("something went wrong", e);
    }

})

app.patch("/user/:userId", async (req, res) => {
    const userId = req.params?.userId;
    const data = req.body;

    try {
        const UPDATES_ALLOWED = ["firstName", "lastName", "age", "gender", "photoUrl", "about", "skills",];
        const isUpdateAllowed = Object.keys(data).every((k) => UPDATES_ALLOWED.includes(k));
        if (!isUpdateAllowed) {
            throw new Error("Update is not allowed");
        }
        if ((data?.skills.length > 10)) {
            throw new Error("Skills cannot be more than 10");
        }
        const user = await User.findByIdAndUpdate({ _id: userId }, data, {
            returnDocument: 'after',
            runValidators: true,
        });
        console.log("Updated User:", user);
        res.send("User Updated Successfully");
    } catch (e) {
        res.status(400).send("Update Failed " + e.message);
    }
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


