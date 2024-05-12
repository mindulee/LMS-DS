import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../Layout/Layout";
import { BiRupee } from "react-icons/bi";
import toast from "react-hot-toast";
import { useLocation } from 'react-router-dom';

import { loadStripe } from "@stripe/stripe-js";

const public_stripe_key = "pk_test_51PFeyiLNz035vSJGDKaUvk6TY92oD1aUBwKgTL5RON43REjPZgAfnUdOIzDvP11vxpxoTlU9pIUxOlG0ur4zjglX00JHzo4Xd1";


console.log('hiip' , public_stripe_key)

export default function Checkout() {
  const navigate = useNavigate();

  // Retrieve the price from the location state
  const { state } = useLocation();
  const price = state?.price;
  const courseId = state?.courseId;
  const description = state?.description; 
  const numberOfLectures = state?.numberOfLectures; 
  const status = state?.status;


  
  console.log(price , courseId , description , numberOfLectures ,status )

  const handleSubscription = async () => {
    const stripePromise = await loadStripe(public_stripe_key);
    const response = await fetch(
      "http://localhost:3001/create-stripe-session-subscription",
      {
        method: "POST",
        headers: { "Content-Type": "Application/JSON" },
        body: JSON.stringify([
          { item: "Online Video Editor", qty: "3", itemCode: "99" },
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
      });
    }
  };


  return (
    <div className="App">
    <div
      style={{
        margin: "30px",
        borderWidth: "3px 9px 9px 9px",
        borderStyle: "solid",
        borderColor: "#FF6633",
        height: "100px",
        borderRadius: "10px",
      }}
    >
      Online Video Editor <br />
      Charges - 800INR Per Month <br />
      Quantity - 3 Copies <br />
      <button onClick={() => handleSubscription()}> Subscribe Now! </button>
    </div>
  </div>
  );
}
