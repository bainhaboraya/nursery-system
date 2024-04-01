const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const classSchema = new mongoose.Schema({
    _id: {
        type: Number,
    },
    name: {
        type: String,
        required: true
    },
    supervisor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"teacher"
    },
    children: {
        type: [Number],
        required: true,
        ref:"Child"
    }
});
classSchema.plugin(AutoIncrement, {
    id: 'class_model_id_counter',
    inc_field: "_id"
});

module.exports = mongoose.model("Class", classSchema); 
