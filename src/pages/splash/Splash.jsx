import React from "react";
import StudentIdentity from "../../components/student_identity/StudentIdentity";
import { useNavigate } from "react-router-dom";

export default function Splash() {
  const navigate = useNavigate();

  const navToHome = () => {
    navigate("/ToDoList_TAWeek2/home");
  };

  return (
    <>
      <StudentIdentity />
      <div className="flex items-center justify-items-center w-screen h-screen">
        <div className="flex flex-col items-center w-full">
          <span className="text-lg font-medium text-gray-900 dark:text-white">
            Get <span class="italic">Organized</span> With Your Life !!!
          </span>
          <p style={{ textAlign: "center" }}>
            to-do list and task manager app which help you manage time
          </p>
          <button
            className="bg-pink-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4"
            onClick={navToHome}
          >
            Get Started!
          </button>
        </div>
      </div>
    </>
  );
}
