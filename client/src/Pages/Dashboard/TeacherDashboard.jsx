import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../../Layout/Layout";

export default function TeacherDashboard() {
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

  const onDeleteCourse = async (courseId) => {
    try {
      const response = await fetch(`http://localhost:3000/Course/delete/${courseId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete course');
      }
      setMyCourses(myCourses.filter(course => course._id !== courseId));
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <Layout hideFooter={true}>
      <section className="py-5 lg:py-10 flex flex-col gap-7">
        <h1 className="text-center text-3xl text-yellow-500 font-inter font-semibold">
          Teacher{" "}
          <span className="text-violet-500 font-nunito-sans">Dashboard</span>
        </h1>
        <div className=" w-[100%] self-center flex flex-col justify-center gap-10 mb-10">
          <div className="flex w-full items-center justify-between md:px-[40px] px-3">
            <h1 className="text-center font-inter md:text-3xl text-xl text-gray-600 dark:text-slate-50 font-semibold">
              Courses overview
            </h1>

            <button
              onClick={() => {
                navigate("/course/create");
              }}
              className="w-fit bg-yellow-500 transition-all ease-in-out duration-300 rounded py-2 px-4 font-[600] font-inter text-lg text-white cursor-pointer"
            >
              Create new course
            </button>
          </div>

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
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="text-black font-[500] text-sm dark:text-slate-300 font-open-sans">
                  {myCourses.map((course, idx) => (
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
                      <td className="flex items-center gap-4">
                        <button
                          className="bg-green-500 text-white font-inter transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-[500]"
                          onClick={() =>
                            navigate("/course/displaylectures", {
                              state: { ...course },
                            })
                          }
                        >
                          Display Lectures
                        </button>
                        <button
                          className="bg-red-500 text-white  transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-inter font-[500]"
                          onClick={() => onDeleteCourse(course?._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
