const express = require('express');
const router = express.Router();
const { getAllCourses  } = require('../controllers/learnerController');

router.get('/', getAllCourses);





module.exports = router;
