const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const childSchema = new mongoose.Schema({
    _id: Number, 
    fullName: { type: String, required: true },
    age: { type: Number, required: true },
    level: {
        type: String,
        enum: ['PreKG', 'KG1', 'KG2'],
        required: true
    },
    address: {
        city: { type: String, required: true },
        street: { type: String, required: true },
        building: { type: String }
    },
    img: String
});

childSchema.plugin(AutoIncrement, { inc_field: '_id' });

module.exports = mongoose.model('Child', childSchema);
