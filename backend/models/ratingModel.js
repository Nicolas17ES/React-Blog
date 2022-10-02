const mongoose = require('mongoose');

const ratingSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Post'
    },
    agree: {
        type: Boolean,
        required: [true, 'Please select a rating value'],
        enum: ['Agree', 'Desagree']
    },
}, 
{
    timestamps: true,
})

module.exports = mongoose.model('Rating', ratingSchema)