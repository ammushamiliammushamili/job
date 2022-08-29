const mongoose = require('mongoose')
const jobapplicationSchema = mongoose.Schema({
    companyName: {
        type: String,
        maxLength: 50,
        required: true,
        trim: true,
    },
    companyId: {
        type: String,
        maxLength: 50,
        required: true,
        trim: true,
    },
    userName: {
        type: String,
        maxLength: 50,
        required: true,
        trim: true,
    },
    userId: {
        type: String,
        maxLength: 50,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        maxLength: 50,
        required: true,
        trim: true,
    },
    jobId: {
        type: String,
        maxLength: 50,
        required: true,
        trim: true,
    },
    ApplyDate: {
        type: String,
        maxLength: 50,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        maxLength: 50,
        required: true,
        trim: true,
        default: "applied"
    },
    number: {
        type: String,
        maxLength: 50,
        required: true,
        trim: true,
    }

})
module.exports = mongoose.model("jobapplication", jobapplicationSchema);
