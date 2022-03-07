const mongoose = require('mongoose');
const ServiceSchema = mongoose.Schema({
    petName: {
        type: String,
        required: true
    },
    data: {
        type: String,
        required: true
    },
    horario: {
        type: String,
        required: true
    },
    servico: {
        type: String,
        required: true
    },
    portePet: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Service', ServiceSchema);