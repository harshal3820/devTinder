const express = require('express');
const { connectDB } = require('./config/db');
const User = require('./models/user')

const app = express();

app.post("/signup", async(req,res) => {
    //creating a new instance of an user model
    const user = new User({
        firstName: "Virat",
        lastName: "Kohli",
        emailId: "virat@kohli.com",
        password: "virat@123",
    });

    try{
        await user.save();
        res.send("USer added successfully");
    } catch (err) {
        res.status(400).send("Error saving the user:" + err.message);
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


