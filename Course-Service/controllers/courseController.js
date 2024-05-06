const Course = require('../models/Course');

async function getAllCourses(req, res) {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function createNewCourse(req, res) {
    const {
        title,
        instructor,
        category,
        description,
        lectures,
        price,
        
    } = req.body;

    const course = new Course({
        title,
        instructor,
        category,
        description,
        lectures,
        price,
        
    });

    try {
        const newCourse = await course.save();
        res.status(201).json(newCourse);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

async function updateCourse(req, res) {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        Object.assign(course, req.body);

        const updatedCourse = await course.save();
        res.json(updatedCourse);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

async function deleteCourse(req, res) {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        await Course.deleteOne({ _id: req.params.id });
        res.json({ message: 'Course deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function getCourseById(req, res) {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json(course);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { getCourseById , getAllCourses, createNewCourse, updateCourse, deleteCourse };
