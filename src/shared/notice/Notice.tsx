import './Notice.scss';

import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';

import emptyFilesSvg from '../../assets/icons/empty-files.svg';
import errorSvg from '../../assets/icons/error.svg';
import notFoundSvg from '../../assets/icons/not-found.svg';
import unauthorizedSvg from '../../assets/icons/unauthorized.svg';

export type NoticeType = 'error' | 'not-found' | 'unauthorized' | 'empty';

type NoticeConfig = {
  heading: string;
  message: string;
  icon: string;
};

export type NoticeProps = {
  type?: NoticeType;
  heading?: string;
  message?: string;
  showHomeLink?: boolean;
};

const TYPE_CONFIG: Record<NoticeType, NoticeConfig> = {
  error: {
    heading: 'Something went wrong',
    message: 'An unexpected error occurred.',
    icon: errorSvg,
  },
  'not-found': {
    heading: 'Page not found',
    message: "The page you're looking for doesn't exist.",
    icon: notFoundSvg,
  },
  unauthorized: {
    heading: 'Unauthorized',
    message: 'You need to be logged in to view this page.',
    icon: unauthorizedSvg,
  },
  empty: { heading: 'Nothing here', message: 'No results found.', icon: emptyFilesSvg },
};

const STATUS_TYPE: Record<number, NoticeType> = {
  400: 'error',
  401: 'unauthorized',
  403: 'unauthorized',
  404: 'not-found',
  500: 'error',
};

const Notice = ({
  type: typeProp,
  heading: headingProp,
  message: messageProp,
  showHomeLink = true,
}: NoticeProps = {}) => {
  const error = useRouteError();

  const resolvedType =
    typeProp ?? (isRouteErrorResponse(error) ? (STATUS_TYPE[error.status] ?? 'error') : 'error');

  // resolvedType is always a controlled NoticeType value, never user input
  // eslint-disable-next-line security/detect-object-injection
  const { heading: defaultHeading, message: defaultMessage, icon } = TYPE_CONFIG[resolvedType];

  return (
    <section className="notice" aria-labelledby="notice-heading">
      <img className="notice__icon" src={icon} alt="" aria-hidden="true" />
      <h2 className="notice__heading" id="notice-heading">
        {headingProp ?? defaultHeading}
      </h2>
      <p className="notice__message">{messageProp ?? defaultMessage}</p>
      {showHomeLink && (
        <Link className="notice__link" to="/">
          Go to home page
        </Link>
      )}
    </section>
  );
};

export default Notice;
