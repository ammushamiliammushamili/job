const mongoose = require('mongoose')
const NottificationSchema = mongoose.Schema({
    from: {

        type: String,
        maxLength: 50,
        required: true,
        trim: true,
    },
    fromName: {

        type: String,
        maxLength: 50,
        required: true,
        trim: true,
    },
    to: {

        type: String,
        maxLength: 50,
        required: true,
        trim: true,
    },
    message: {

        type: String,
        maxLength: 50,
        required: true,
        trim: true,
    },
    date: {

        type: String,
        maxLength: 50,
        required: true,
        trim: true,
    },
    time: {
        type: String,
        maxLength: 50,
        required: true,
        trim: true,
    }


})
module.exports = mongoose.model("Nottification", NottificationSchema);

