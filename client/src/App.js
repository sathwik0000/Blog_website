import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Single from "./pages/Single";
import Write from "./pages/Write";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./style.scss";

const Layout = () => {
  return (
    <>
       <Navbar/>
       <Outlet/>
       <Footer/>
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
      path:"/post/:id",
      element:<Single/>
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
        <Footer />
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
    path: "/Single",
    element: <Single />,
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
