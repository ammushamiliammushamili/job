const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
    username: {
        type: String,
        maxLength: 50,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        maxLength: 100,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        maxLength: 100,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        maxLength: 100,
        required: true,
        trim: true,
    },
    number: {
        type: String,
        maxLength: 100,
        required: true,
        trim: true,
    },
    workStatus: {
        type: String,
        maxLength: 100,
        // required: true,
        // trim: true,
    },
    skills: {
        type: String,
        maxLength: 100,
        trim: true,
    },
    education: {
        type: String,
        maxLength: 100,
        trim: true,
    },
    additionalinform: {
        type: Boolean,
        default: false,
    }
});

module.exports = mongoose.model("user", UserSchema);