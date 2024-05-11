import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import { useFormik } from "formik";
import * as yup from "yup";
import InputBox from "../Components/InputBox/InputBox";
import { useSelector } from "react-redux";
import { userSignInAction } from "../Redux/actions/userAction";

const validationSchema = yup.object({
  email: yup.string().email().required("Email is required"),
  password: yup.string().min(8).required("Password is required"),
});

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, userInfo } = useSelector((state) => state.signIn);
  
  useEffect(() => {
    if (isAuthenticated) {
      if (userInfo.role === 1) {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    }
  }, [isAuthenticated]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      dispatch(userSignInAction(values));
      actions.resetForm();
    },
  });

  return (
    <Layout>
      <section className="flex flex-col gap-6 items-center py-8 px-3 min-h-[100vh]">
        <form
          onSubmit={formik.handleSubmit}
          autoComplete="off"
          noValidate
          className="flex flex-col dark:bg-base-100 gap-4 rounded-lg md:py-5 py-7 md:px-7 px-3 md:w-[500px] w-full shadow-custom dark:shadow-xl"
        >
          <h1 className="text-center dark:text-purple-500 text-4xl font-bold font-inter">
            Login Page
          </h1>
          {/* email */}
          <InputBox
            label={"Email"}
            name={"email"}
            type={"email"}
            placeholder={"Enter your email..."}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={formik.touched.email && formik.errors.email}
          />
          {/* password */}
          <InputBox
            label={"Password"}
            name={"password"}
            type={"password"}
            placeholder={"Enter your password..."}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            error={formik.touched.password && formik.errors.password}
          />

          {/* submit btn */}
          <button
            type="submit"
            className="mt-2 bg-yellow-500 text-white dark:text-base-200 transition-all ease-in-out duration-300 rounded-md py-2 font-nunito-sans font-[500] text-lg cursor-pointer"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Logging..." : "Login"}
          </button>

          {/* link */}
          <p className="text-center font-inter text-gray-500 dark:text-slate-300">
            Do not have an account ?{" "}
            <Link to="/signup" className="link text-blue-600 font-lato cursor-pointer">
              signup
            </Link>
          </p>
        </form>
      </section>
    </Layout>
  );
}
