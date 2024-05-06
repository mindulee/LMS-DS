const mongoose = require('mongoose');

const learnerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  email: String,
  enrolledCourses: [{
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    courseDetails: Object // Store course details
  }]
});

module.exports = mongoose.model('Learner', learnerSchema);
