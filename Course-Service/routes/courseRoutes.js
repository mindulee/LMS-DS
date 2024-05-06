const express = require('express');
const router = express.Router();

const {getCourseById , getAllCourses, createNewCourse, updateCourse, deleteCourse} = require('../controllers/courseController')


router.get('/', getAllCourses);

// Get a single course by ID
router.get('/:id', getCourseById);

// Create a new course  ,
router.post('/add', createNewCourse );

// Update a course  isAdmin ,
router.put('/update/:id',  updateCourse);

// Delete a course   isAdmin ,
router.delete('/delete/:id',  deleteCourse);




module.exports = router;


