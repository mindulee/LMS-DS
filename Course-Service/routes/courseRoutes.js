const express = require('express');
const router = express.Router();
const upload = require("../middleware/multer.middleware");
const {acceptCourse, denyCourse , create_New_Course , deleteCourseLecture  , getAllCourses, removeCourse , addLectureToCourseById , getLecturesByCourseId} = require('../controllers/courseController')

router.get('/', getAllCourses);
router.get('/lectures/:id',getLecturesByCourseId)
router.delete('/lecture/delete/courses', deleteCourseLecture);
// Create a new course  ,
router.post('/add', upload.single("thumbnail") , create_New_Course );
// Delete a course   isAdmin ,
router.delete('/delete/:id',  removeCourse);
router.post('/lecture/:id' , upload.single("lecture"), addLectureToCourseById)
router.post('/accept', acceptCourse);
router.post('/deny', denyCourse);


module.exports = router;


