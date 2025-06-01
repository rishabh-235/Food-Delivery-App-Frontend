import SearchBar from "../components/SearchBar";
import "./PagesStyle/order.css";
import OrderCard from "../components/OrderCard";
import { useGetOrdersQuery } from "../redux/slices/api/order.api.slice";
import { useGetTablesQuery } from "../redux/slices/api/admin.api.slice";

function OrderPage() {
  const { data: orders } = useGetOrdersQuery();

  const { data: tables } = useGetTablesQuery();

  const getTableIndex = (tableId) => {
    return tables?.findIndex((table) => table._id === tableId);
  };

  return (
    <div className="order-page-container">
      <div className="analytics-searchbar-container">
        <SearchBar />
      </div>

      <div className="table-content-container">
        <p className="table-content-title">Order Line</p>

        <div className="order-line-container">
          {orders?.slice().reverse().map((order, index)=>{
            return (<OrderCard order={order} getTableIndex={getTableIndex} key={index} />);
          })}
        </div>
      </div>
    </div>
  );
}

export default OrderPage;
