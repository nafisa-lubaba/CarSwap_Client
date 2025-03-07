import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../Pages/RootPages/Home/Home";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import SignUpFlow from "../components/auth/SignUpFlow";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
   
    children: [
      {
        path: "/",
        element: <Home />,
      },
      { path: "/signUpFlow", element: <SignUpFlow></SignUpFlow> },
      { path: "/login", element: <Login></Login> },
      { path: "/signup", element: <Signup></Signup> },
    ],
  },
]);
