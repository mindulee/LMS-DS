const express = require('express');
const router = express.Router();
const { acceptCourse, denyCourse  , adminControllerFunction} = require('../controllers/adminController')


router.post('/course/accept', acceptCourse);
router.post('/course/deny', denyCourse);
router.get('/getusers', adminControllerFunction);
module.exports = router;