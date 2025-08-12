import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import WriteArticle from "./pages/WriteArticle";
import BlogTitles from "./pages/BlogTitles";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      errorElement: <div>404</div>,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/ai/write-article",
          element: <WriteArticle />,
        },
        {
          path: "/ai/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/ai/blog-titles",
          element: <BlogTitles />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
