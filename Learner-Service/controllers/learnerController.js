const Learner = require('../models/learner');
const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const COURSE_SERVICE_URL = 'http://localhost:3000/Course'; // Course service URL through API gateway
const USER_SERVICE_URL = 'http://localhost:3000/User';

async function enrollCourse(req, res) {
  try {
    const { courseId, userId } = req.params;

    // Check if the course exists
    const courseResponse = await axios.get(`${COURSE_SERVICE_URL}/${courseId}`);
    const course = courseResponse.data;
    
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

/*    // Check if the user exists
    const userResponse = await axios.get(`${USER_SERVICE_URL}/${userId}`);
    const user = userResponse.data;
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
*/
    // Find the learner by userId
    let learner = await Learner.findOne({ userId: userId });

    // If learner doesn't exist, create a new one
    if (!learner) {
      learner = new Learner({
        //name: user.name, 
       // email: user.email, 
       userId: userId,
        enrolledCourses: [] // Initialize enrolledCourses array
      });
    }

    // Check if the course is already enrolled by the learner
    const isEnrolled = learner.enrolledCourses.some(enrolledCourse => enrolledCourse.courseId.equals(course._id));
    if (isEnrolled) {
      return res.status(400).json({ error: "Course already enrolled" });
    }

    // Add the enrollment details to enrolledCourses array
    learner.enrolledCourses.push({
      courseId: course._id,
      courseDetails: course
    });

    // Save the learner
    await learner.save();

    res.status(200).json({ message: "Enrollment successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function unenrollCourse(req, res) {
  try {
    const { courseId, userId } = req.params;

    // Find the learner by userId
    const learner = await Learner.findOne({ userId });

    // If learner doesn't exist, return error
    if (!learner) {
      return res.status(404).json({ error: "Learner not found" });
    }

    // Filter out the enrolled course
    learner.enrolledCourses = learner.enrolledCourses.filter(enrolledCourse => !enrolledCourse.courseId.equals(courseId));

    // Save the learner
    await learner.save();

    res.status(200).json({ message: "Unenrollment successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}



module.exports = { enrollCourse , unenrollCourse };
