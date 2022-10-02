const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    type: {
        type: String,
        required: [true, 'Please select a type'],
        enum: ['Culture', 'Art', 'Politics', 'Society']
    },
     username: {
        type: String,
        required: [true, 'Please add a username'],
    },
    title: {
        type: String,
        required: [true, 'Please add a title'],
    },
    body: {
        type: String,
        required: [true, 'Please add a body to your post'],
    },
    status: {
        type: String,
        required: true,
        enum: ['new', 'open', 'closed'],
        default: 'new'
    }
}, 
{
    timestamps: true,
})

module.exports = mongoose.model('Post', postSchema)