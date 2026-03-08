import { createBrowserRouter } from "react-router-dom";

import Layout from "../layout/Layout";
import HomePage from "../pages/HomePage";
import RestaurantPage from "../pages/RestaurantPage";
import Notice from "../shared/notice/Notice";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <Notice />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/restaurant/:id",
        element: <RestaurantPage />,
      },
    ],
  },
]);
