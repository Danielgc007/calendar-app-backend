const { Schema, mongoose, model } = require('mongoose');

const EventoSchema = Schema({

    title: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId, // esto va a ser una referencia
        ref: 'Usuario', // y la referencia va a ser a usuario
        required: true
    }

});

EventoSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model( 'Evento', EventoSchema );