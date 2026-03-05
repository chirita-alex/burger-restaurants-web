import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";

const STATUS_MESSAGES: Record<number, { heading: string; message: string }> = {
  400: { heading: "Bad request", message: "The request was invalid. Please check the URL and try again." },
  401: { heading: "Unauthorized", message: "You need to be logged in to view this page." },
  403: { heading: "Forbidden", message: "You don't have permission to view this page." },
  404: { heading: "Page not found", message: "The page you're looking for doesn't exist." },
  500: { heading: "Server error", message: "Something went wrong on our end. Please try again later." },
};

const DEFAULT_STATUS = { heading: "Something went wrong", message: "An unexpected error occurred." };

// TODO: Better UI for error states, maybe with different images for different status codes
const Notice = () => {
  const error = useRouteError();

  const { heading, message } = isRouteErrorResponse(error)
    ? (STATUS_MESSAGES[error.status] ?? DEFAULT_STATUS)
    : DEFAULT_STATUS;

  return (
    <section aria-labelledby="error-heading">
      <h1 id="error-heading">{heading}</h1>
      <p>{message}</p>
      <Link to="/">Go to home page</Link>
    </section>
  );
};

export default Notice;
