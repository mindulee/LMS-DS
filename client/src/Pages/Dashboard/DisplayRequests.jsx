import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../../Layout/Layout";

export default function DisplayRequests() {
  const navigate = useNavigate();
  const [myCourses, setMyCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);

  const fetchCourses = async () => {
    try {
      const response = await fetch("http://localhost:3000/Course/");
      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }
      const data = await response.json();
      setMyCourses(data.courses);
      setLoadingCourses(false);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setLoadingCourses(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleAccept = async (courseId) => {
    try {
      const response = await fetch("http://localhost:3000/Admin/course/accept", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseId }),
      });
      if (!response.ok) {
        throw new Error("Failed to accept course");
      }
      // Refresh courses after status update
      fetchCourses();
    } catch (error) {
      console.error("Error accepting course:", error);
    }
  };

  const handleDeny = async (courseId) => {
    try {
      const response = await fetch("http://localhost:3000/Admin/course/deny", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseId }),
      });
      if (!response.ok) {
        throw new Error("Failed to deny course");
      }
      // Refresh courses after status update
      fetchCourses();
    } catch (error) {
      console.error("Error denying course:", error);
    }
  };

  return (
    <Layout hideFooter={true}>
      <section className="py-5 lg:py-10 flex flex-col gap-7">
        <div className="w-full overflow-x-scroll">
          {loadingCourses ? (
            <div>Loading...</div>
          ) : (
            <table className="table">
              <thead className="text-gray-900 dark:text-slate-300 font-lato">
                <tr>
                  <th>S No</th>
                  <th>Course Title</th>
                  <th>Course Category</th>
                  <th>Instructor</th>
                  <th>Total Lectures</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="text-black font-[500] text-sm dark:text-slate-300 font-open-sans">
                {myCourses
                  .filter((course) => course.status === "pending")
                  .map((course, idx) => (
                    <tr key={course._id}>
                      <td>{idx + 1}</td>
                      <td>
                        <textarea
                          readOnly
                          value={course?.title}
                          className="w-40 h-auto bg-transparent resize-none"
                        ></textarea>
                      </td>
                      <td>{course?.category}</td>
                      <td>{course?.createdBy}</td>
                      <td>{course?.numberOfLectures}</td>
                      <td className="max-w-28  whitespace-nowrap">
                        <textarea
                          value={course?.description}
                          readOnly
                          className="w-80 h-auto bg-transparent  line-clamp-2 resize-none"
                        ></textarea>
                      </td>
                      <td>{course?.status}</td>
                      <td className="flex items-center gap-4">
                        <button
                          className="bg-green-500 text-white font-inter transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-[500]"
                          onClick={() => handleAccept(course?._id)}
                        >
                          Accept
                        </button>
                        <button
                          className="bg-red-500 text-white  transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-inter font-[500]"
                          onClick={() => handleDeny(course?._id)}
                        >
                          Deny
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </Layout>
  );
}
