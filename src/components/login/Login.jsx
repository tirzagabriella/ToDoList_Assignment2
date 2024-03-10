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
      <button
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-10"
        onClick={() => handleGoogleLogin()}
      >
        Sign in with Google
      </button>
    </form>
  );
}
