import { Link } from "react-router-dom";

export default function Header({
  heading,
  paragraph,
  linkName,
  linkUrl = "#",
}) {
  return (
    <div className="mb-10">
      <h2 className="mt-6 text-center text-3xl font-extrabold text-pink-500">
        {heading}
      </h2>
      <p className="mt-2 text-center text-sm text-pink-500 mt-5">
        {paragraph}{" "}
        <Link
          to={linkUrl}
          className="font-medium text-pink-200 hover:text-pink-500"
        >
          {linkName}
        </Link>
      </p>
    </div>
  );
}
