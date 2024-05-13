import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Layout from "../../Layout/Layout";
import { useSelector } from "react-redux";

export default function DisplayLecture() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { userInfo } = useSelector((state) => state.signIn);
  const [lectures, setLectures] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [progress, setProgress] = useState(0);

  async function getLectures(courseId) {
    try {
      const res = await axios.get(`http://localhost:3000/Course/lectures/${courseId}`);
      console.log("Fetched Lectures:", res.data);
      toast.success("Lectures Fetched Successfully");
      setLectures(res?.data.course?.lectures || []);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

  async function deleteLecture(courseId, lectureId) {
    const loadingId = toast.loading("Deleting Lecture...");
    try {
      await axios.delete(`http://localhost:3000/Course/lecture/delete/courses?courseId=${courseId}&lectureId=${lectureId}`);
      toast.success("Lecture Deleted Successfully", { id: loadingId });
      getLectures(courseId);
    } catch (error) {
      toast.error(error?.response?.data?.message, { id: loadingId });
    }
  }

  useEffect(() => {
    if (!state) navigate("/courses");
    if (state?._id) getLectures(state?._id);
  }, [state]);

  return (
    <Layout hideFooter={true} hideNav={true} hideBar={true}>
      <section className="flex flex-col gap-6 items-center h-screen overflow-y-scroll">
        <div className="flex flex-col dark:bg-base-100 relative gap-5 rounded-lg py-10 pt-3 px-7 md:w-[calc(100% - 2rem)] w-full h-full shadow-custom dark:shadow-xl">
          <h1 className="text-center relative w-fit dark:text-purple-500 md:text-2xl text-lg font-bold font-inter after:content-[' ']  after:absolute after:-bottom-2  md:after:left-0 after:left-3 after:h-[3px] after:w-[60%] after:rounded-full after:bg-yellow-400 dark:after:bg-yellow-600">
            Course:{" "}
            <span className="text-violet-500 dark:text-yellow-500 font-nunito-sans">
              {state?.title}
            </span>
          </h1>
          <div className="flex md:flex-row flex-col md:justify-between w-full h-[80%]">
            <div className="md:w-[48%] w-full md:p-3 p-1 overflow-y-scroll flex justify-center">
              <div className="w-full h-[350px] border bg-[#0000003d] shadow-lg">
                <video
                  src={lectures && lectures?.[currentVideo]?.lecture?.secure_url}
                  disablePictureInPicture
                  disableRemotePlayback
                  controls
                  controlsList="nodownload"
                  className="h-full mx-auto"
                ></video>
                <div className="py-7">
                  <h1 className="text-[17px] text-gray-700 font-[500] dark:text-white font-lato">
                    <span className="text-blue-500 dark:text-yellow-500 font-inter font-semibold text-lg">
                      {" "}
                      Title:{" "}
                    </span>
                    {lectures && lectures?.[currentVideo]?.title}
                  </h1>
                  <p className="text-[16.5px] pb-12 text-gray-700 font-[500] dark:text-slate-300 font-lato">
                    <span className="text-blue-500 dark:text-yellow-500 font-inter font-semibold text-lg">
                      Description:{" "}
                    </span>
                    {lectures && lectures?.[currentVideo]?.description}
                  </p>
                </div>
              </div>
            </div>
            <div className="md:w-[48%] pb-12 md:flex-row flex-col w-full md:h-full h-[50%] overflow-y-scroll"> 
              <ul className="w-full md:p-2 p-0 flex flex-col gap-5 shadow-sm">
                <li className="font-semibold bg-slate-50 dark:bg-slate-100 p-3 rounded-md shadow-lg sticky top-0 text-xl text-[#2320f7] font-nunito-sans flex items-center justify-between">
                  <p>Lectures list</p>
                  
                    <button
                      onClick={() => navigate("/course/addlecture", { state: { ...state } })}
                      className="btn-primary px-3 py-2 font-inter rounded-md font-semibold text-sm"
                    >
                      Add new lecture
                    </button>
                
                </li>
                {lectures &&
                  lectures.map((lecture, idx) => (
                    <li className="space-y-2" key={lecture._id}>
                      <p
                        className={`cursor-pointer text-base font-[500] font-open-sans ${
                          currentVideo === idx
                            ? "text-blue-600 dark:text-yellow-500"
                            : " text-gray-600 dark:text-white"
                        }`}
                        onClick={() => {
                          setCurrentVideo(idx);
                          if (progress < 100) {
                            setProgress((idx + 1) / lectures.length * 100);
                          }
                        }}
                      >
                        <span className="font-inter">{idx + 1}. </span>
                        {lecture?.title}
                      </p>
                      <button
                        onClick={() => deleteLecture(state?._id, lecture?._id)}
                        className="bg-[#ff3838] px-2 py-1 rounded-md text-white font-inter font-[500]  text-sm"
                      >
                        Delete lecture
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div className="w-1/2 mx-auto h-10 mt-4 bg-gray-200 rounded-lg border border-gray-300 overflow-hidden">
  <div className="h-full bg-gradient-to-r from-blue-900 to-blue-600" style={{ width: `${progress}%` }}></div>
</div>


        </div>
      </section>
    </Layout>
  );
}
