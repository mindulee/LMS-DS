const express = require('express');
const router = express.Router();
const { enrollCourse , unenrollCourse } = require('../controllers/learnerController');

// Endpoint to enroll in a course
router.post('/enroll/:courseId/:userId', enrollCourse);

router.post('/unenroll/:courseId/:userId', unenrollCourse);



module.exports = router;
