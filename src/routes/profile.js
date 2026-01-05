const express = require('express');
const { userAuth } = require('../middlewares/auth');
const { validateEditProfileData } = require('../utils/validation');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const validator = require('validator');

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        if (!validateEditProfileData(req)) {
            throw new Error("Invalid edit request");
        }

        const loggedinUser = req.user;

        Object.keys(req.body).forEach(key => loggedinUser[key] = req.body[key]);
        await loggedinUser.save();
        res.json({ message: `${loggedinUser.firstName}, your profile updated successfully`, data: loggedinUser });

    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
})

profileRouter.patch("/profile/edit/password", userAuth, async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        // Validate inputs
        if (!oldPassword || !newPassword) {
            throw new Error("Both old and new passwords are required");
        }
        if (!validator.isStrongPassword(newPassword)) {
            throw new Error("New password must be strong (at least 8 chars, with uppercase, lowercase, number, and symbol)");
        }

        // Verify old password
        const isOldPasswordValid = await req.user.validatePassword(oldPassword);
        if (!isOldPasswordValid) {
            throw new Error("Old password is incorrect");
        }

        // Hash new password and update
        const newPasswordHash = await bcrypt.hash(newPassword, 10);
        req.user.password = newPasswordHash;
        await req.user.save();

        res.json({ message: `${req.user.firstName}, your password has been updated successfully` });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = profileRouter;