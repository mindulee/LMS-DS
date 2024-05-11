// adminController.js

const axios = require('axios');

async function acceptCourse(req, res) {
    const { courseId } = req.body;

    try {
        const response = await axios.post('http://localhost:3000/course/accept', { courseId });

        return res.status(200).json(response.data);
    } catch (error) {
        console.error('Error accepting course:', error);
        return res.status(500).json({ message: 'An error occurred while accepting course' });
    }
}

async function denyCourse(req, res) {
    const { courseId } = req.body;

    try {
        const response = await axios.post('http://localhost:3000/course/deny', { courseId });

        return res.status(200).json(response.data);
    } catch (error) {
        console.error('Error denying course:', error);
        return res.status(500).json({ message: 'An error occurred while denying course' });
    }
}

module.exports = { acceptCourse, denyCourse };
