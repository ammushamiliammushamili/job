const mongoose = require("mongoose");
const JobSchema = mongoose.Schema({
    jobtitle: {
        type: String,
        maxLength: 50,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        maxLength: 50,
        required: true,
        trim: true,
    },
    vaccancy: {
        type: String,
        maxLength: 50,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        maxLength: 50,
        required: true,
        trim: true,
    },
    area: {
        type: String,
        maxLength: 50,
        required: true,
        trim: true,
    },
    publisheddate: {
        type: String,
        maxLength: 50,
        required: true,
        trim: true,
    },
    companyName: {
        type: String,
        required: true,
        trim: true,
    },
    companyId: {
        type: String,
        required: true,
        trim: true,
    },
    stastus: {
        type: String,
        required: true,
        trim: true,
        default: 'Active'
    },
    salary: {
        type: String,
        required: true,
        trim: true,
    }
});

module.exports = mongoose.model("job", JobSchema);
