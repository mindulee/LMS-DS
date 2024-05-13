import React from "react";

const ProgressBar = ({ progress }) => {
  const progressPercentage = (progress * 100).toFixed(2);
  return (
    <div className="progress-bar-container">
      <div
        className="progress-bar"
        style={{ width: `${progressPercentage}%` }}
      ></div>
      <span>{progressPercentage}%</span>
    </div>
  );
};

export default ProgressBar;
