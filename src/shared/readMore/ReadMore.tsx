import { useId, useState } from "react";
import "./ReadMore.scss";

type ReadMoreProps = {
  children: string;
  maxChars?: number;
  textClassName?: string;
  showMoreAriaLabel?: string;
};

const ReadMore = ({ children, maxChars = 200, textClassName = "read-more__text", showMoreAriaLabel }: ReadMoreProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const textId = useId();

  if (children.length <= maxChars) {
    return <p className={textClassName}>{children}</p>;
  }

  const buttonLabel = isExpanded ? "Show less" : "Read more";
  const ariaLabelText = showMoreAriaLabel ? `${buttonLabel}: ${showMoreAriaLabel}` : undefined;

  return (
    <div className="read-more">
      <p id={textId} className={textClassName}>
        {isExpanded
          ? children
          : <>{children.slice(0, maxChars).trim()}<span aria-hidden="true">...</span></>}
      </p>
      <button
        type="button"
        className="read-more__toggle"
        onClick={() => setIsExpanded((prev) => !prev)}
        aria-expanded={isExpanded}
        aria-controls={textId}
        aria-label={ariaLabelText}
      >
        {buttonLabel}
      </button>
    </div>
  );
};

export default ReadMore;
