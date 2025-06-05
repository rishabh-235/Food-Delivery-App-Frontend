import "./styles/spinner.css";

const Spinner = ({ size = 40 }) => (
  <div className="spinner-container">
    <div
      style={{
        display: "inline-block",
        width: size,
        height: size,
      }}
      role="status"
      aria-label="Loading"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 50 50"
        className="spinner-svg"
      >
        <g className="spinner-rotate">
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="#000"
            strokeWidth="6"
            strokeDasharray="90 60"
            strokeLinecap="round"
          />
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="#fff"
            strokeWidth="6"
            strokeDasharray="45 105"
            strokeDashoffset="20"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  </div>
);

export default Spinner;
