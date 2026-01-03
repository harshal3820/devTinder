const express = require('express');
const { connectDB } = require('./config/db');
const User = require('./models/user')

const app = express();

app.use(express.json()); //convert json data into js object

app.post("/signup", async (req, res) => {
    console.log(req.body);
    // creating a new instance of an user model
    const user = new User(req.body);

    try {
        await user.save();
        res.send("USer added successfully");
    } catch (err) {
        res.status(400).send("Error saving the user:" + err.message);
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

app.patch("/user", async(req, res) => {
    const userId = req.body.userId;
    const data = req.body;

    try{
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


