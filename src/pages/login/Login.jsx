import Header from "../../components/header/Header";
import Login from "../../components/login/Login";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
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
        heading="Login to your account"
        paragraph="Don't have an account yet? "
        linkName="Signup"
        linkUrl="/signup"
      />
      <Login />
    </>
  );
}
