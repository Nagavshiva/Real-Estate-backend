const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent', required: true },
    type: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    status: { type: String, default: 'Not Sold' },
});

module.exports = mongoose.model('Property', propertySchema);
