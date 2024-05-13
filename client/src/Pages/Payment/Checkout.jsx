import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../Layout/Layout";
import { BiRupee } from "react-icons/bi";
import toast from "react-hot-toast";
import { useLocation } from 'react-router-dom';

import { loadStripe } from "@stripe/stripe-js";
import { useDispatch, useSelector } from "react-redux";

const public_stripe_key = "pk_test_51PFwGfFrbv2S9033dnBx0eoFHI4FNU1cKyW7ZqkylY4tCRKRru8wAxcbmmSwT2cVUulOscwXz1AeDTtpz6i6IKoD00fVvIzzmH";

export default function Checkout() {
  const navigate = useNavigate();

  // Retrieve the price from the location state
  const { state } = useLocation();
  const {userInfo} = useSelector((state) => state.signIn)
  const price = state?.price;
  const courseId = state?.courseId;
  const description = state?.description; 
  const numberOfLectures = state?.numberOfLectures; 
  const status = state?.status;
  const title = state?.title;
 const userId = userInfo.userId

  console.log(price , courseId , description , numberOfLectures ,  status , userId , title)
  


  const handleSubscription = async (e) => {
    e.preventDefault();

    savePaymentDetails()

    const requestBody = {
      courseId: courseId,
      description: description,
      numberOfLectures: numberOfLectures,
      status: status,
      userId: userId,
      price:price,

    };

    const stripePromise = await loadStripe(public_stripe_key);
    const response = await fetch(
      "http://localhost:3001/create-stripe-session-subscription",
      {
        method: "POST",
        headers: { "Content-Type": "Application/JSON" },
        body: JSON.stringify([
          {item: "Online Video Editor" , qty: "3" , itemCode:"99"}
        ]),
      }
    );

    if (response.status === 409) {
      const data = await response.json();
      if (data && data.redirectUrl) {
        window.location.href = data.redirectUrl; // redirect to billing portal if user is already subscribed
      }
    } else {
      const session = await response.json();
      stripePromise.redirectToCheckout({
        sessionId: session.id,
        successUrl: `${window.location.origin}/checkout/success`, // Specify success URL
        cancelUrl: `${window.location.origin}/checkout`, // Specify cancel URL
      });
    }
  };

  const savePaymentDetails = async (paymentDetails) => {

    const requestBody = {
      courseId: courseId,
      userId: userId,
      price:price,
      title:title

    };
    try {
      await fetch("http://localhost:3000/admin/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
    } catch (error) {
      console.error("Error saving payment details:", error);
      // Handle error
      throw error;
    }
  };

  return (
    <Layout>
      <section className="flex flex-col gap-6 items-center py-8 px-3 min-h-[100vh]">
        <form
          onSubmit={handleSubscription}
          className="flex flex-col dark:bg-gray-800 bg-white gap-4 rounded-lg md:py-10 py-7 md:px-8 md:pt-3 px-3 md:w-[500px] w-full shadow-custom dark:shadow-xl transition duration-300"
        >
          <div>
            <h1 className="bg-yellow-500 w-full text-center py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg text-white">
              Subscription Bundle
            </h1>
            <div className="px-4 space-y-7 text-center text-gray-600 dark:text-gray-300">
              <p className="text-lg mt-5">
                Unlock access to all available courses on our platform for{" "}
                <span className="text-yellow-500 font-bold">1 year</span>. This
                includes both existing and new courses.
              </p>

              <p className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-500">
                LKR:
                <span>{state.price}</span>
              </p>

              <div className="text-xs">
                <p className="text-blue-600 dark:text-yellow-500">
                  100% refund on cancellation
                </p>
                <p>* Terms and conditions apply *</p>
              </div>

              <button
                type="submit"
                className="bg-yellow-500  transition duration-300 w-full text-xl font-bold text-white py-2 rounded-bl-lg rounded-br-lg"
              >
                Buy now
              </button>
            </div>
          </div>
        </form>
      </section>
    </Layout>
  );
}
