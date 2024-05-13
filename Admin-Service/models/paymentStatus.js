const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    userId: {
        type: String,
        trim: true,
        maxlength: 70,
    },
    courseId: {
        type: String,
        trim: true
    },
    courseName: {
        type: String,
        trim: true,
    },
    price: {
        type: String,
    },
}, { timestamps: true });

module.exports = mongoose.model("PaymentStatus", paymentSchema);
