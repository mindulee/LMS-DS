import React, { useState, useEffect } from "react";
import axios from 'axios';
import CourseCard from "../../Components/CourseCard";
import Layout from "../../Layout/Layout";
import { Link, useNavigate } from "react-router-dom";

export default function CourseList() {
  const [coursesData, setCoursesData] = useState([]);
  const navigate = useNavigate()

  async function fetchCourses() {
    try {
      const res = await axios.get("http://localhost:3000/Course/");
      // Filter the courses to display only those with status 'accepted'
      const acceptedCourses = res.data.courses.filter(course => course.status === 'accepted');
      setCoursesData(acceptedCourses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <Layout>
      <section className="flex flex-col gap-14 md:py-6 py-5 md:px-20 px-3 min-h-screen">
        <div className="flex justify-between items-center">
          <h1 className="md:text-4xl text-2xl w-fit text-blue-600 dark:text-white font-inter font-[500] after:content-[' '] relative after:absolute after:-bottom-3.5 after:left-0 after:h-1.5 after:w-[60%] after:rounded-full after:bg-yellow-400 dark:after:bg-yellow-600">
            Explore the courses made by{" "}
            <span className="font-[600] font-lato text-yellow-500">
              Industry experts
            </span>
          </h1>
          <button
            onClick={() => navigate("/course/create")}
            className="bg-orange-500 dark:bg-orange-600 text-white text-xl rounded-md font-bold px-5 py-3    transition-all ease-in-out duration-300"
          >
            Create Course
          </button>
        </div>
        {/* course container */}
        <div className="flex gap-12 md:justify-start justify-center flex-wrap">
          {coursesData.map((element) => {
            return <CourseCard key={element._id} data={element} />;
          })}
        </div>
      </section>
    </Layout>
  );
}
