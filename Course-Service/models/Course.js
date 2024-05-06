const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    instructor: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: String,
    lectures: [{
        title: String,
        duration: Number, // Duration of the lecture in minutes
        videoUrl: String
    }],
    price: {
        type: Number,
        default: 0 // Default price is 0
    },
    enrolledUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
    
});

module.exports = mongoose.model('Course', courseSchema);
