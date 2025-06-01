import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage"
import AnalyticsPage from "./pages/AnalyticsPage";
import TablesPage from "./pages/TablesPage";
import OrderPage from "./pages/OrderPage";
import MenuPage from "./pages/MenuPage";
import MenuMainPage from "./pages/MenuMainPage";
import CheckOutPage from "./pages/CheckOutPage";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />}>
            <Route index element={<AnalyticsPage />} />
            <Route path="/edit-tables" element={<TablesPage />} />
            <Route path="/order-book" element={<OrderPage />} />
          </Route>

          <Route path="/order-food" element={<MenuMainPage />}>
            <Route index element={<MenuPage />} />
            <Route path="/order-food/checkout" element={<CheckOutPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
