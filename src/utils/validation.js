const validator = require("validator");

const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;
    if (!firstName || !lastName) {
        throw new Error("First name and Last name are required");
    }
    else if (!validator.isEmail(emailId)) {
        throw new Error("Email is not valid: " + emailId);
    }
    else if (!validator.isStrongPassword(password)) {
        throw new Error("Please enter a strong password!");
    }

};

module.exports = {
    validateSignUpData,
}