
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

const fetchUserData = async () => {
    try {
        const response = await axios.get('http://localhost:3000/user/api/allUsers');
        return response.data.users; 
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

const adminControllerFunction = async (req, res , next) => {
    try {
        const users = await fetchUserData();
        console.log(users)
        
        res.status(200).json({ success: true, users });
    } catch (error) {
        next(error);
    }
};




module.exports = { acceptCourse, denyCourse , adminControllerFunction };
