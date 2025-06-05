import SearchBar from "../components/SearchBar";
import "./PagesStyle/order.css";
import OrderCard from "../components/OrderCard";
import { useGetOrdersQuery } from "../redux/slices/api/order.api.slice";
import { useGetTablesQuery } from "../redux/slices/api/admin.api.slice";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";

function OrderPage() {
  const { data: orders, isLoading } = useGetOrdersQuery();
  const { data: tables } = useGetTablesQuery();
  const [searchText, setSearchText] = useState("");
  const [orderArray, setOrderArray] = useState(orders || []);

  const getTableIndex = (tableId) => {
    return tables?.findIndex((table) => table._id === tableId);
  };

  useEffect(() => {
    setOrderArray(orders || []);
  }, [orders]);

  useEffect(() => {
    if (!searchText) {
      setOrderArray(orders || []);
    } else {
      const filteredOrders = orders?.filter((order) => {
        return (
          order?.status.toLowerCase().includes(searchText.toLowerCase()) ||
          order?.mode.toLowerCase().includes(searchText.toLowerCase())
        );
      });
      setOrderArray(filteredOrders || []);
    }
  }, [searchText]);

  return (
    <div className="order-page-container">
      <div className="analytics-searchbar-container">
        <SearchBar searchText={searchText} setSearchText={setSearchText} />
      </div>

      <div className="table-content-container">
        <p className="table-content-title">Order Line</p>

        {isLoading ? (
          <Spinner />
        ) : (
          <div className="order-line-container">
            {orderArray
              ?.slice()
              .reverse()
              .map((order, index) => {
                return (
                  <OrderCard
                    order={order}
                    getTableIndex={getTableIndex}
                    key={index}
                  />
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderPage;
