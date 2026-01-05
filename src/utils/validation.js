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

const validateEditProfileData = (req) => {
    const allwedEditFields = ["firstName", "lastName","photoUrl", "about", "skills", "age", "gender"];

    const isEditAllowed = Object.keys(req.body).every((field) => allwedEditFields.includes(field));

    return isEditAllowed;
}

module.exports = {
    validateSignUpData,
    validateEditProfileData,
}