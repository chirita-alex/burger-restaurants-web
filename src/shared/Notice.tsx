import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";
import errorSvg from "../assets/icons/error.svg";
import notFoundSvg from "../assets/icons/not-found.svg";
import unauthorizedSvg from "../assets/icons/unauthorized.svg";
import emptyFilesSvg from "../assets/icons/empty-files.svg";
import "./Notice.scss";

type NoticeConfig = {
  heading: string;
  message: string;
  icon: string;
};

const STATUS_CONFIG: Record<number, NoticeConfig> = {
  400: { heading: "Bad request", message: "The request was invalid. Please check the URL and try again.", icon: emptyFilesSvg },
  401: { heading: "Unauthorized", message: "You need to be logged in to view this page.", icon: unauthorizedSvg },
  403: { heading: "Forbidden", message: "You don't have permission to view this page.", icon: unauthorizedSvg },
  404: { heading: "Page not found", message: "The page you're looking for doesn't exist.", icon: notFoundSvg },
  500: { heading: "Server error", message: "Something went wrong on our end. Please try again later.", icon: errorSvg },
};

const DEFAULT_CONFIG: NoticeConfig = {
  heading: "Something went wrong",
  message: "An unexpected error occurred.",
  icon: errorSvg,
};

const Notice = () => {
  const error = useRouteError();

  const { heading, message, icon } = isRouteErrorResponse(error)
    ? (STATUS_CONFIG[error.status] ?? DEFAULT_CONFIG)
    : DEFAULT_CONFIG;

  return (
    <section className="notice" aria-labelledby="notice-heading">
      <img className="notice__icon" src={icon} alt="" aria-hidden="true" />
      <h1 className="notice__heading" id="notice-heading">{heading}</h1>
      <p className="notice__message">{message}</p>
      <Link className="notice__link" to="/">Go to home page</Link>
    </section>
  );
};

export default Notice;
