import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import { BsCollectionPlayFill, BsTrash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [myCourses, setMyCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [users, setUsers] = useState([]);
  const [payments, setPayments] = useState([]);

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

  const fetchPayments = async () => {
    try {
      const response = await fetch("http://localhost:3000/admin/getdetails");
      if (!response.ok) {
        throw new Error("Failed to fetch payment details");
      }
     
      const data = await response.json();
      setPayments(data.payments);
      console.log('ki' , payments)
    } catch (error) {
      console.error("Error fetching payment details:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchUsers();
    fetchPayments();
  }, []);

  const handleRequestButtonClick = () => {
    navigate("/admin/requests");
  };

  return (
    <Layout hideFooter={true}>
  {/* Request button */}
  <button
    onClick={handleRequestButtonClick}
    className="bg-yellow-500 text-white font-inter text-xl py-2 px-4 rounded-md font-[500] mt-5 mx-auto"
  >
    Requests
  </button>
  
  {/* Course Table */}
  <section className="py-5 lg:py-10 flex flex-col gap-7">
    <h2 className="text-center text-2xl text-yellow-500 font-inter font-semibold mb-5">
      Course Information
    </h2>
    <div className="flex flex-col gap-14">
      <div className="w-full overflow-x-scroll">
        {/* Course Table */}
        {loadingCourses ? (
          <div>Loading...</div>
        ) : (
          <table className="table-auto w-full">
            <thead className="text-gray-900 dark:text-slate-300 font-lato">
              <tr>
                <th className="px-4 py-2">S No</th>
                <th className="px-4 py-2">Course Title</th>
                <th className="px-4 py-2">Course Category</th>
                <th className="px-4 py-2">Instructor</th>
                <th className="px-4 py-2">Total Lectures</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="text-black font-[500] text-sm dark:text-slate-300 font-open-sans">
              {myCourses.map((course, idx) => (
                <tr key={course._id}>
                  <td className="border px-4 py-2">{idx + 1}</td>
                  <td className="border px-4 py-2">
                    <textarea
                      readOnly
                      value={course?.title}
                      className="w-40 h-auto bg-transparent resize-none"
                    ></textarea>
                  </td>
                  <td className="border px-4 py-2">{course?.category}</td>
                  <td className="border px-4 py-2">{course?.createdBy}</td>
                  <td className="border px-4 py-2">{course?.numberOfLectures}</td>
                  <td className="border px-4 py-2 max-w-28 whitespace-nowrap">
                    <textarea
                      value={course?.description}
                      readOnly
                      className="w-80 h-auto bg-transparent line-clamp-2 resize-none"
                    ></textarea>
                  </td>
                  <td className="border px-4 py-2">{course?.price}</td>
                  <td className="border px-4 py-2 flex items-center gap-4">
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
                      className="bg-red-500 text-white transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-inter font-[500]"
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

  {/* User Table */}
  <section className="py-5 lg:py-10 flex flex-col gap-7">
    <h2 className="text-center text-2xl text-yellow-500 font-inter font-semibold mb-5">
      User Information
    </h2>
    <div className="w-full overflow-x-scroll">
      <table className="table-auto w-full">
        <thead className="text-gray-900 dark:text-slate-300 font-lato">
          <tr>
            <th className="px-4 py-2">First Name</th>
            <th className="px-4 py-2">Last Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Role</th>
          </tr>
        </thead>
        <tbody className="text-black font-[500] text-sm dark:text-slate-300 font-open-sans">
          {users.map((user, idx) => (
            <tr key={user.id}>
              <td className="border px-4 py-2">{user.firstName}</td>
              <td className="border px-4 py-2">{user.lastName}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.role === 0 ? 'Learner' : user.role === 2 ? 'Teacher' : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>

  {/* Payment Details Table */}
  <section className="py-5 lg:py-10 flex flex-col gap-7">
    <h2 className="text-center text-2xl text-yellow-500 font-inter font-semibold mb-5">
      Payment Details
    </h2>
    <div className="w-full overflow-x-scroll">
      <table className="table-auto w-full">
        <thead className="text-gray-900 dark:text-slate-300 font-lato">
          <tr>
            <th className="px-4 py-2">UserId</th>
            <th className="px-4 py-2">CourseID</th>
            <th className="px-4 py-2">Course Name</th>
            <th className="px-4 py-2">Price</th>
          </tr>
        </thead>
        <tbody className="text-black font-[500] text-sm dark:text-slate-300 font-open-sans">
          {payments.map((payment, idx) => (
            <tr key={payment.id}>
              <td className="border px-4 py-2">{payment.userId}</td>
              <td className="border px-4 py-2">{payment.courseId}</td>
              <td className="border px-4 py-2">{payment.courseName}</td>
              <td className="border px-4 py-2">{payment.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
</Layout>


  );
}
