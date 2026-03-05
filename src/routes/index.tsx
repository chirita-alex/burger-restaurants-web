import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import RestaurantPage from "../pages/RestaurantPage";
import Notice from "../shared/Notice";

export const router = createBrowserRouter([
  {
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
