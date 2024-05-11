const express = require('express');
const router = express.Router();
const { acceptCourse, denyCourse } = require('../controllers/adminController')


router.post('/course/accept', acceptCourse);
router.post('/course/deny', denyCourse);

module.exports = router;