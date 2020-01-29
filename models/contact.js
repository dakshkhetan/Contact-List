const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
});

const Contact = mongoose.model('Contact', contactSchema);

// exporting the model 'Contact' with the schema, so as to be used in 'index.js'
module.exports = Contact;