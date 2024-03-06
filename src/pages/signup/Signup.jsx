import Header from "../../components/header/Header";
import Signup from "../../components/signup/Signup";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const navigate = useNavigate();
  const navtoSplash = () => {
    navigate("/");
  };

  return (
    <>
      <button
        className="bg-pink-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-4"
        onClick={navtoSplash}
      >
        Back
      </button>
      <Header
        heading="Signup to create an account"
        paragraph="Already have an account? "
        linkName="Login"
        linkUrl="/"
      />
      <Signup />
    </>
  );
}
