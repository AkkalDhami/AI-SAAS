import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import WriteArticle from "./pages/WriteArticle";
import BlogTitles from "./pages/BlogTitles";
import GenerateImages from "./pages/GenerateImages";
import RemoveBg from "./pages/RemoveBg";
import ReviewResume from "./pages/ReviewResume";
import Community from "./pages/Community";
import RemoveObject from "./pages/RemoveObject";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <div>404</div>,
    },
    {
      path: "/ai",
      element: <AppLayout />,
      children: [
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
        {
          path: "/ai/generate-images",
          element: <GenerateImages />,
        },
        {
          path: "/ai/remove-background",
          element: <RemoveBg />,
        },
        {
          path: "/ai/remove-object",
          element: <RemoveObject />,
        },
        {
          path: "/ai/review-resume",
          element: <ReviewResume />,
        },
        {
          path: "/ai/community",
          element: <Community />,
        },
      ],
    },
  ]);
  const { getToken } = useAuth();

  useEffect(() => {
    getToken()
      .then((token) => console.log(token))
      .catch((err) => console.log(err));
  }, []);

  return <RouterProvider router={router} />;
};

export default App;
