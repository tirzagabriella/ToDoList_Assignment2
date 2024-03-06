import { useState } from "react";
import { signupFields } from "../../constants/formFields";
import FormAction from "../../components/formextra/FormAction";
import Input from "../../components/input/input";
import { registerWithEmailAndPassword } from "../../../firebase";
import { useNavigate } from "react-router-dom";

const fields = signupFields;
let fieldsState = {};

fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Signup() {
  const [signupState, setSignupState] = useState(fieldsState);
  const navigate = useNavigate();

  const navToLogin = () => {
    navigate("/login"); // Redirect to the login page instead of the home page
  };

  const handleChange = (e) =>
    setSignupState({ ...signupState, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(signupState);
    createAccount();
  };

  //handle Signup API Integration here
  const createAccount = async () => {
    try {
      const res = await registerWithEmailAndPassword(
        signupState["username"],
        signupState["email"],
        signupState["password"]
      );

      console.log("Registered : ", res);

      navToLogin();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <form className="mt-8 space-y-6 mx-4" onSubmit={handleSubmit}>
      <div className="">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={signupState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
        <FormAction handleSubmit={handleSubmit} text="Signup" />
      </div>
    </form>
  );
}
