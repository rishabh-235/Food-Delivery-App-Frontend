import "./styles/order_card.css";
import knife_fork_icon from "../assets/kinfe_fork_icon.png";

function OrderCard({ order, getTableIndex }) {
  const tableIndex = getTableIndex(order.tables[0]);
  const remainingTime = order.totalTimeToMake -Math.floor((Date.now() - new Date(order.createdAt).getTime()) / 60000);
  const totalItems = order.items.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const mode = order.mode || "Dine In";
  const status = order.status === "pending" ? "Processing" : "Done";

  return (
    <div
      className={`order-line-card ${
        status === "Processing"
          ? mode === "Take Away"
            ? "order-take-away"
            : "order-dine-in"
          : "order-done"
      }`}
    >
      <div className="order-line-card-header">
        <div className="order-line-card-header-left">
          <p className="order-line-card-title">
            <img
              width={11.95}
              height={19.61}
              src={knife_fork_icon}
              alt="fork and knife"
            />{" "}
            {`# ${order._id.slice(-3)}`}
          </p>
          <p className="order-table-time">
            <span>Table-{tableIndex + 1}</span>
            <span>{new Date(order.createdAt).toLocaleTimeString()}</span>
          </p>

          <p className="order-line-items-count">{totalItems} Item</p>
        </div>
        <div
          className={`order-line-card-header-right ${
            status === "Processing"
              ? mode === "Take Away"
                ? "order-take-away"
                : "order-dine-in"
              : "order-done"
          }`}
        >
          <p
            className={`order-line-card-order-mode ${
              status === "Processing"
                ? mode === "Take Away"
                  ? "order-take-away-status"
                  : "order-dine-in-status"
                : "order-done-status"
            }`}
          >
            {mode}
          </p>
          <p className="order-line-card-order-status">
            {`${status === "Processing" ? `Ongoing: ${remainingTime} Min` : "Served"}`}
          </p>
        </div>
      </div>
      <div className="order-line-card-content">
        <dl>
          {order.items.map((item, index) => {
            return (
              <dt key={index}>
                {item.quantity}x {item.itemName}
              </dt>
            );
          })}
        </dl>
      </div>

      <div
        className={`order-line-card-order-status-button ${
          status === "Processing"
            ? mode === "Take Away"
              ? "order-take-away-button"
              : "order-dine-in-button"
            : "order-done-button"
        }`}
      >
        {status}
        {status === "Processing" ? (
          <svg
            width="9"
            height="15"
            viewBox="0 0 9 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 13.3376V13.2072C0 11.2475 1.93858 9.25665 2.92269 8.23641C3.45427 7.67973 3.5017 7.0651 2.92269 6.45875C1.93858 5.43644 0 3.45598 0 1.48586V1.37411C0 0.465626 0.492055 0 1.31215 0H7.65156C8.47165 0 8.96371 0.465626 8.96371 1.37411V1.48586C8.96371 3.45598 7.02513 5.43644 6.04102 6.45668C5.46201 7.06303 5.50154 7.67973 6.04102 8.23434C7.02513 9.25458 8.96371 11.2454 8.96371 13.2052V13.3355C8.96371 14.244 8.47165 14.7096 7.65156 14.7096H1.31215C0.492055 14.7096 0 14.244 0 13.3355V13.3376ZM7.69108 2.96138C7.83534 2.68821 7.75827 2.46678 7.5073 2.46678H1.45641C1.19556 2.46678 1.11849 2.68821 1.27263 2.96138C1.71725 3.76019 3.37522 5.53785 3.89692 5.99312C4.32179 6.35735 4.63994 6.35735 5.05493 5.99312C5.58651 5.53785 7.24448 3.76019 7.68911 2.96138H7.69108Z"
              fill={`${mode === "Take Away" ? "#3B413D" : "#D87300"}`}
            />
          </svg>
        ) : (
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.12258 13.794V12.0821C2.12258 11.915 2.08363 11.8047 1.96356 11.6781L0.751473 10.4579C-0.24643 9.46001 -0.254543 8.53188 0.751473 7.53397L1.96356 6.31377C2.08201 6.19532 2.12258 6.07687 2.12258 5.91786V4.19789C2.12258 2.77162 2.77973 2.12258 4.19789 2.12258H5.91786C6.07687 2.12258 6.19532 2.08363 6.31377 1.96356L7.53397 0.751473C8.53188 -0.24643 9.46001 -0.254543 10.4579 0.751473L11.6781 1.96356C11.8047 2.08201 11.915 2.12258 12.0821 2.12258H13.794C15.2203 2.12258 15.8693 2.78785 15.8693 4.19789V5.91786C15.8693 6.07687 15.9164 6.19532 16.0364 6.31377L17.2485 7.53397C18.2464 8.53188 18.2545 9.46001 17.2485 10.4579L16.0364 11.6781C15.918 11.8047 15.8693 11.915 15.8693 12.0821V13.794C15.8693 15.2203 15.2122 15.8693 13.794 15.8693H12.0821C11.915 15.8693 11.8047 15.9164 11.6781 16.0364L10.4579 17.2485C9.46001 18.2464 8.53188 18.2545 7.53397 17.2485L6.31377 16.0364C6.19532 15.918 6.07687 15.8693 5.91786 15.8693H4.19789C2.77973 15.8693 2.12258 15.2122 2.12258 13.794ZM8.77851 12.4878L12.5024 6.6172C12.5981 6.45818 12.7004 6.27645 12.7004 6.09472C12.7004 5.72963 12.3758 5.49273 12.0351 5.49273C11.8209 5.49273 11.6148 5.61118 11.4639 5.85782L8.08079 11.2936L6.47279 9.21824C6.27483 8.957 6.10121 8.87749 5.87891 8.87749C5.51383 8.87749 5.23636 9.17118 5.23636 9.53465C5.23636 9.70827 5.30776 9.89162 5.42621 10.049L7.41552 12.4894C7.62159 12.7669 7.84389 12.8691 8.11325 12.8691C8.3826 12.8691 8.61301 12.7425 8.77851 12.4894V12.4878Z"
              fill="#0E912F"
            />
          </svg>
        )}
      </div>
    </div>
  );
}

export default OrderCard;
