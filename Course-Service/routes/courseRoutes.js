const express = require('express');
const router = express.Router();
const {getAllCourses , createNewCourse , updateCourse , deleteCourse} = require('../controllers/courseController')


router.get('/', getAllCourses);

// Create a new course  ,
router.post('/add', createNewCourse );

// Update a course  isAdmin ,
router.put('/update/:id',  updateCourse);

// Delete a course   isAdmin ,
router.delete('/delete/:id',  deleteCourse);




module.exports = router;


module.exports = router;