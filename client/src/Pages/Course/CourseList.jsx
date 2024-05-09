import React, { useState, useEffect } from "react";
import axios from 'axios'; // Import axios for fetching data
import CourseCard from "../../Components/CourseCard";
import Layout from "../../Layout/Layout";

export default function CourseList() {
  const [coursesData, setCoursesData] = useState([]);

  async function fetchCourses() {
    try {
      const res = await axios.get("http://localhost:3000/Course/"); // Assuming your API endpoint is /courses
      setCoursesData(res.data.courses); // Assuming courses are returned in res.data.courses
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
        <h1 className="md:text-4xl text-2xl w-fit text-blue-600 dark:text-white font-inter font-[500] after:content-[' '] relative after:absolute after:-bottom-3.5 after:left-0 after:h-1.5 after:w-[60%] after:rounded-full after:bg-yellow-400 dark:after:bg-yellow-600">
          Explore the courses made by{" "}
          <span className="font-[600] font-lato text-yellow-500">
            Industry experts
          </span>
        </h1>
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
