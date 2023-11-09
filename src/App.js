/** @format */

import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Layout from "./pages/Layout";
import { Toaster } from "react-hot-toast";
import { HelmetProvider } from "react-helmet-async";

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { path: "", element: <Home /> },
        { path: "home", element: <Home /> },
        { path: "about", element: <About /> },
        { path: "contact", element: <Contact /> },
      ],
    },
  ]);
  return (
    <>
      <HelmetProvider>
        <Toaster />
        <RouterProvider router={router} />
      </HelmetProvider>
    </>
  );
}

export default App;
