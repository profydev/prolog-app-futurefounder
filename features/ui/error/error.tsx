import styles from "./error.module.scss";

interface ErrorComponentProps {
  onRetry: () => void;
}

export const ErrorComponent: React.FC<ErrorComponentProps> = ({ onRetry }) => {
  return (
    <div className={styles.alertContainer}>
      <div className={styles.contentContainer}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <g clip-path="url(#clip0_644_24329)">
            <path
              d="M9.99999 6.66663V9.99996M9.99999 13.3333H10.0083M18.3333 9.99996C18.3333 14.6023 14.6024 18.3333 9.99999 18.3333C5.39762 18.3333 1.66666 14.6023 1.66666 9.99996C1.66666 5.39759 5.39762 1.66663 9.99999 1.66663C14.6024 1.66663 18.3333 5.39759 18.3333 9.99996Z"
              stroke="#D92D20"
              stroke-width="1.66667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_644_24329">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <div className={styles.contentContainer}>
          <div className={styles.contentText}>
            {" "}
            There was a problem while loading the project data
          </div>
        </div>
        <div className={styles.contentContainer}>
          <button onClick={onRetry} className={styles.contentLink}>
            Try again
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M4.16669 10.0001H15.8334M15.8334 10.0001L10 4.16675M15.8334 10.0001L10 15.8334"
                stroke="#B42318"
                stroke-width="1.67"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
