import { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Splash from "./pages/splash/Splash";
import Home from "./pages/home/Home";
import "./App.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  const router = createBrowserRouter([
    {
      path: "/ToDoList_TAWeek2/",
      element: <Splash />,
    },
    {
      path: "/ToDoList_TAWeek2/home",
      element: <Home />,
    },
  ]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <RouterProvider router={router} />
    </LocalizationProvider>
  );
}

export default App;
