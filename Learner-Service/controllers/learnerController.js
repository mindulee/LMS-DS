const Learner = require('../models/learner');
const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const COURSE_SERVICE_URL = 'http://localhost:3000/Course'; // Course service URL through API gateway

const getAllCourses = async (req, res, next) => {
  
}
module.exports = { getAllCourses  };
