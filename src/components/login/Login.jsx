import { useState } from "react";
import { loginFields } from "../../constants/formFields";
import FormAction from "../../components/formextra/FormAction";
// import FormExtra from "../../components/formextra/FormExtra";
import Input from "../../components/input/input";
import {
  logInWithEmailAndPassword,
  signInWithGoogle,
} from "../../services/firebase-auth";
import { useNavigate } from "react-router-dom";

const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Login() {
  const [loginState, setLoginState] = useState(fieldsState);
  const navigate = useNavigate();

  const navToHome = () => {
    navigate("/home"); // Redirect to the login page instead of the home page
  };

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authenticateUser();
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      navToHome();
    } catch (error) {
      console.error(error);
      alert(err.message);
    }
  };

  //Handle Login API Integration here
  const authenticateUser = async () => {
    try {
      await logInWithEmailAndPassword(
        loginState["email"],
        loginState["password"]
      );
      navToHome();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <form className="mt-8 space-y-6 mx-4" onSubmit={handleSubmit}>
      <div className="-space-y-px">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={loginState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
      </div>

      {/* <FormExtra /> */}
      <FormAction handleSubmit={handleSubmit} text="Login" />
      {/* <button
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-10"
        onClick={() => handleGoogleLogin()}
      >
        Sign in with Google
      </button> */}
      <button
        type="button"
        class="text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
        onClick={() => handleGoogleLogin()}
      >
        <svg
          class="mr-2 -ml-1 w-4 h-4"
          aria-hidden="true"
          focusable="false"
          data-prefix="fab"
          data-icon="google"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 488 512"
        >
          <path
            fill="currentColor"
            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
          ></path>
        </svg>
        Sign up with Google<div></div>
      </button>
    </form>
  );
}
