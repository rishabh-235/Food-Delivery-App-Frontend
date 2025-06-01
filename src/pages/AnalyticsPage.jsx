import "./PagesStyle/analytics.css";
import chefIcon from "../assets/chefIcon.png";
import client from "../assets/client.png";
import orderIcon from "../assets/orderIcon.png";
import rupeeIcon from "../assets/currencyIcon.png";
import dropdownIcon from "../assets/arrow_down.png";
import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";
import {
  useGetAnalyticsQuery,
  useGetTablesQuery,
  useGetChefsQuery,
  useGetTodayOrderSummaryQuery,
  useGetMonthlyOrderSummaryQuery,
  useGetYearlyOrderSummaryQuery,
  useGetWeeklyRevenueSummaryQuery,
  useGetMonthlyRevenueSummaryQuery,
  useGetYearlyRevenueSummaryQuery
} from "../redux/slices/api/admin.api.slice";
import { useEffect, useState } from "react";
import FilterBar from "../components/FilterBar";

function AnalyticsPage() {
  const { data: analyticsData } = useGetAnalyticsQuery();
  const { data: tables } = useGetTablesQuery();
  const { data: chefs } = useGetChefsQuery();
  const [orderSummaryOption, setOrderSummaryOption] = useState("daily");
  const { data: todayOrderSummary } = useGetTodayOrderSummaryQuery();
  const { data: monthlyOrderSummary } = useGetMonthlyOrderSummaryQuery();
  const { data: yearlyOrderSummary } = useGetYearlyOrderSummaryQuery();
  const [orderSummaryValue, setOrderSummaryValue] = useState(todayOrderSummary);
  const [revenueSummaryOption, setRevenueSummaryOption] = useState("daily");
  const { data: weeklyRevenueSummary } = useGetWeeklyRevenueSummaryQuery();
  const { data: monthlyRevenueSummary } = useGetMonthlyRevenueSummaryQuery();
  const { data: yearlyRevenueSummary } = useGetYearlyRevenueSummaryQuery();
  const [revenueSummaryValue, setRevenueSummaryValue] = useState(weeklyRevenueSummary);
  const [filter, setFilter] = useState("All");

  const handleOrderSummaryChange = (event) => {
    setOrderSummaryOption(event.target.value);
  };

  useEffect(() => {
    if (orderSummaryOption === "daily") {
      setOrderSummaryValue(todayOrderSummary);
    } else if (orderSummaryOption === "monthly") {
      setOrderSummaryValue(monthlyOrderSummary);
    } else if (orderSummaryOption === "yearly") {
      setOrderSummaryValue(yearlyOrderSummary);
    }
  }, [
    orderSummaryOption,
    todayOrderSummary,
    monthlyOrderSummary,
    yearlyOrderSummary,
  ]);

  const handleRevenueChange = (event) => {
    setRevenueSummaryOption(event.target.value);
  };

  useEffect(() => {
    if (revenueSummaryOption === "daily") {
      setRevenueSummaryValue(weeklyRevenueSummary);
    } else if (revenueSummaryOption === "monthly") {
      setRevenueSummaryValue(monthlyRevenueSummary);
    } else if (revenueSummaryOption === "yearly") {
      setRevenueSummaryValue(yearlyRevenueSummary);
    }
  }, [weeklyRevenueSummary, revenueSummaryOption]);

  return (
    <div className="analytics-page-container">
      <div className="analytics-searchbar-container">
        <FilterBar filter={filter} setFilter={setFilter} />
      </div>
      <div className="analytics-content-container">
        <p className="analytics-title">Analytics</p>
        <div className="overview-container">
          <div className="chef-container">
            <img width={60} height={45} src={chefIcon} alt="totalchef" />

            <div className="chef-text-container">
              <p className="chef-count">04</p>
              <p className="chef-label">TOTAL CHEF</p>
            </div>
          </div>

          <div className="chef-container">
            <div className="chef-icon">
              <img width={25} height={25} src={rupeeIcon} alt="totalrevenue" />
            </div>

            <div className="chef-text-container">
              <p className="chef-count">{analyticsData?.totalRevenue}</p>
              <p className="chef-label">TOTAL REVENUE</p>
            </div>
          </div>

          <div className="chef-container">
            <img width={60} height={45} src={orderIcon} alt="totalorder" />

            <div className="chef-text-container">
              <p className="chef-count">{analyticsData?.totalOrders}</p>
              <p className="chef-label">TOTAL ORDER</p>
            </div>
          </div>

          <div className="chef-container">
            <img width={60} height={45} src={client} alt="totalclient" />

            <div className="chef-text-container">
              <p className="chef-count">{analyticsData?.totalClients}</p>
              <p className="chef-label">TOTAL CLIENT</p>
            </div>
          </div>
        </div>

        <div style={filter !== "All" ? {justifyContent: "center"} : {justifyContent: "space-between"}} className="analytics-chart-container">
          {(filter === "Order Summary" || filter === "All") && <div style={filter !== "All" ? {width: "60%"} : {}} className="order-summary-card">
            <div className="order-summary-card-header">
              <div>
                <p className="order-summary-card-title">Order Summary</p>
                <p className="order-summary-card-description">
                  It shows the summary of all orders placed.
                </p>
              </div>
              <div className="analytics-dropdown-container-order">
                <img src={dropdownIcon} alt="order" />
                <select
                  onChange={handleOrderSummaryChange}
                  id="order-summary"
                  className="analytics-dropdown"
                >
                  <option value="daily">Daily</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
            </div>

            <div className="order-summary-card-content">
              <div className="served-card">
                <p className="served-count">
                  {orderSummaryValue?.deliveredCount}
                </p>
                <p className="served-label">Served</p>
              </div>

              <div className="served-card">
                <p className="served-count">{orderSummaryValue?.dineInCount}</p>
                <p className="served-label">Dine in</p>
              </div>

              <div className="served-card">
                <p className="served-count">
                  {orderSummaryValue?.takeAwayCount}
                </p>
                <p className="served-label">Take Away</p>
              </div>
            </div>

            <div className="order-summary-pie-chart">
              <PieChart data={orderSummaryValue} />
            </div>
          </div>}

          {(filter === "Revenue Analysis" || filter === "All") && <div style={filter !== "All" ? {width: "60%"} : {}} className="order-summary-card">
            <div className="order-summary-card-header">
              <div>
                <p className="order-summary-card-title">Revenue</p>
                <p className="order-summary-card-description">
                  It shows the revenue generated from all orders.
                </p>
              </div>
              <div className="analytics-dropdown-container-revenue">
                <img src={dropdownIcon} alt="revenue" />
                <select
                  onChange={handleRevenueChange}
                  className="analytics-dropdown"
                >
                  <option value="daily">Daily</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
            </div>

            <div className="revenue-summary-line-chart">
              <LineChart data={revenueSummaryValue} />
            </div>
          </div>}

          {(filter === "Table Analysis" || filter === "All") && <div style={filter !== "All" ? {width: "60%"} : {}} className="order-summary-card">
            <div className="order-summary-card-header">
              <div>
                <p className="order-summary-card-title">Tables</p>
                <div className="table-status">
                  <span>
                    {" "}
                    <div className="reserved-sign"></div> Reserved
                  </span>
                  <span>
                    {" "}
                    <div className="available-sign"></div> Available
                  </span>
                </div>
              </div>
            </div>

            <div className="table-container">
              <div className="table-list">
                {tables?.map((table, index) => {
                  const tableNumber = index + 1;
                  return (
                    <div
                      key={tableNumber}
                      className={`table-card ${
                        table.status === "occupied" ? "booked" : ""
                      }`}
                    >
                      <p className="table-title">Table</p>
                      <p className="table-no">
                        {tableNumber.toString().padStart(2, "0")}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>}
        </div>

        <div className="order-distribution-container">
          <table className="order-distribution-table">
            <thead>
              <tr>
                <th>Chef Name</th>
                <th>Order Taken</th>
              </tr>
            </thead>

            <tbody>
              {chefs?.map((chef) => (
                <tr key={chef._id}>
                  <td>{chef.name}</td>
                  <td>{chef.orders.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;
