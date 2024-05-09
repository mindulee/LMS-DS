const Course = require('../models/Course');
const  cloudinary  = require('../utills/cloudinary');
const fs = require('fs')


async function getLecturesByCourseId(req,res,next){
    try {
        const { id } = req.params;

        const course = await Course.findById(id)
        if (!course) {
            return res.status(400).json({ message: 'course not found' });
        }

        res.status(200).json({
            success: true,
            message: 'course',
            course
        })
    } catch (e) {
        return res.status(400).json({ message: 'error is a error' });
    }
}

async function addLectureToCourseById(req,res) {
    try {
        const { title, description } = req.body;
        const { id } = req.params;

        if (!title || !description) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const course = await Course.findById(id);

        if (!course) {
            return res.status(400).json({ message: 'course with given id does not exist' });
        
        }

        const lectureData = {
            title,
            description,
            lecture: {}
        }

        // file upload
        if (req.file) {
            try {
                const result = await cloudinary.v2.uploader.upload(req.file.path, {
                    folder: 'Learning-Management-System',
                    resource_type: "video"
                });
                if (result) {
                    lectureData.lecture.public_id = result.public_id;
                    lectureData.lecture.secure_url = result.secure_url;
                }

                fs.rmSync(`uploads/${req.file.filename}`);
            } catch (e) {
                return res.status(400).json({ message: 'error uploading video' });
            }
        }

        course.lectures.push(lectureData);
        course.numberOfLectures = course.lectures.length;

        await course.save();

        res.status(200).json({
            success: true,
            message: 'lecture added successfully'
        })

    } catch (e) {
        return res.status(400).json({ message: 'error ' });
    }
}
async function create_New_Course(req, res) {
    try {
        const { title, description, category, createdBy } = req.body;

        if (!title || !description || !category || !createdBy) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        console.log("Request body:", req.body);

        const course = await Course.create({
            title,
            description,
            category,
            createdBy
        });
        console.log("Created course:", course);

        if (!course) {
           console.log('Course could not be created, please try again');
        }

        course.thumbnail = {};

        // file upload
        if (req.file) {
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'Learning-Management-System'
            });
            console.log("Cloudinary result:", result);

            if (result) {
                course.thumbnail.public_id = result.public_id;
                course.thumbnail.secure_url = result.secure_url;
            }

            fs.rmSync(`uploads/${req.file.filename}`);
        }

        await course.save();

        res.status(200).json({
            success: true,
            message: 'Course successfully created',
            course
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'An error occurred while creating the course' });
    }
}


const getAllCourses = async (req, res, next) => {
    try {
        const courses = await Course.find({}).select('-lectures');

        res.status(200).json({
            success: true,
            message: 'All courses',
            courses
        })
    } catch (e) {
        return res.status(400).json({ message: 'error fetching data' });
    }
}

const deleteCourseLecture = async(req,res , next) => {
    try {
        const { courseId, lectureId } = req.query;

        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(400).json({ message: 'Course not found' });
        }

        const lectureIndex = course.lectures.findIndex(lecture => lecture._id.toString() === lectureId);

        if (lectureIndex === -1) {
            return res.status(400).json({ message: 'lecture not found in the course' });
        }

        course.lectures.splice(lectureIndex, 1);

        course.numberOfLectures = course.lectures.length;

        await course.save();

        res.status(200).json({
            success: true,
            message: 'Lecture deleted successfully'
        });
    } catch (e) {
        return res.status(400).json({ message: 'error in deleting' });
    }
}

// remove course
const removeCourse = async (req, res, next) => {
    try {
        const { id } = req.params;

        const course = await Course.findById(id);

        if (!course) {
            return res.status(400).json({ message: 'no such course' });
        }

        await Course.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'course deleted successfully'
        })

    } catch (e) {
        return res.status(400).json({ message: 'error deleting data data' });
    }
}

module.exports = { deleteCourseLecture , getAllCourses, removeCourse , create_New_Course , addLectureToCourseById ,getLecturesByCourseId };

