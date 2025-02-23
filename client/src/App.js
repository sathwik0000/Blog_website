import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Write from "./pages/Write";
import Navbar from "./components/Navbar";

import "./style.scss";

const Layout = () => {
  return (
    <>
       <Navbar/>
       <Outlet/>
      
    </>
);
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children:[
    {
       path:"/",
       element:<Home/>
    },

    {
      path:"/Write",
      element:<Write/>
   },
  ]
  },
  {
    path: "/home",
    element: (
      <div>
        <Navbar />
        <Home />
      </div>
    ),
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
    path: "/write",
    element: <Write />,
  },
], {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  },
});

function App() {
  return (
    <div className="App">
      <div className="container">
      <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
