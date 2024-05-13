const express = require('express');
const router = express.Router();
const { acceptCourse, denyCourse  , adminControllerFunction , savePayment , getPaymentDetails} = require('../controllers/adminController')


router.post('/course/accept', acceptCourse);
router.post('/course/deny', denyCourse);
router.get('/getusers', adminControllerFunction);
router.post('/save', savePayment);
router.get('/getdetails', getPaymentDetails);
module.exports = router;