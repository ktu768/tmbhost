import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  BrowserRouter,
  RouterProvider,
  Router,
  Route,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";

//import components
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Hostroom from "./pages/Hostroom.jsx";
import Userroom from "./pages/Userroom.jsx";
import Userpage from "./pages/Userpage.jsx";
import Hostpage from "./pages/Hostpage.jsx";
import Game from "./pages/Game.jsx";
import GameOver from "./pages/GameOver.jsx";
import GameHub from "./pages/GameHub.jsx";
import Scream4IceCream from "./pages/Scream4IceCream.jsx";
import Stop10 from "./pages/Stop10.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/lander",
    element: <GameHub />,
  },
  {
    path: "/tambola",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/user",
    element: <Userpage />,
    children: [
      {
        path: "room/:roomid",
        element: <Userroom />,
      },
      //this /user/:roomid is when user is invited to join a room by host to extract roomid from url
      {
        path: ":roomid",
        element: <Userroom />,
      },
    ],
  },
  {
    path: "/host",
    element: <Hostpage />,
    children: [
      {
        path: "room/:roomid",
        element: <Hostroom />,
      },
      {
        path: ":roomid",
        element: <Hostpage />,
      },
    ],
  },
  {
    path: "/game",
    element: <Game />,
    children: [
      {
        path: "gameover",
        element: <GameOver />,
      },
    ],
  },
  {
    path: "/scream4icecream",
    element: <Scream4IceCream />,
  },
  {
    path: "/stop10",
    element: <Stop10 />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
