import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import { BsCollectionPlayFill, BsTrash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [myCourses, setMyCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [users, setUsers] = useState([]);

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
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/admin/getusers");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchUsers();
  }, []);

  const handleRequestButtonClick = () => {
    navigate("/admin/requests");
  };

  return (
    <Layout hideFooter={true}>
      <section className="py-5 lg:py-10 flex flex-col gap-7">
        <h1 className="text-center text-3xl text-yellow-500 font-inter font-semibold">
          Admin{" "}
          <span className="text-violet-500 font-nunito-sans">Dashboard</span>
        </h1>
        <div className="flex flex-col gap-14">
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
                    <th>Price</th>
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
                      <td>{course?.price}</td>
                      <td className="flex items-center gap-4">
                        <button
                          className="bg-green-500 text-white font-inter transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-[500]"
                          onClick={() =>
                            navigate("/course/displaylectures", {
                              state: { ...course },
                            })
                          }
                        >
                          <BsCollectionPlayFill />
                        </button>
                        <button
                          className="bg-red-500 text-white  transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-inter font-[500]"
                          onClick={() => onDeleteCourse(course?._id)}
                        >
                          <BsTrash />
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
      {/* User table */}
      <section className="py-5 lg:py-10 flex flex-col gap-7">
        <div className="w-full overflow-x-scroll">
          <table className="table mt-10">
            <thead className="text-gray-900 dark:text-slate-300 font-lato">
              <tr>
                
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody className="text-black font-[500] text-sm dark:text-slate-300 font-open-sans">
              {users.map((user, idx) => (
                <tr key={user.id}>
                  
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.role === 0 ? 'Learner' : user.role === 2 ? 'Teacher' : ''}</td>
                </tr>
                
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </Layout>
  );
}
