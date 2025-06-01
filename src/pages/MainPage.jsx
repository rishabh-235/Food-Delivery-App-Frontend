import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import "./PagesStyle/mainpage.css";

function MainPage() {
  return (
    <div className="main-page-container">
      <div className="main-page-navbar-container">
        <img className="logo" height={60} width={60} src="https://img.icons8.com/color/100/admin-settings-male.png" alt="logo" />
        <NavBar />
      </div>
      <div className="main-page-content-container">
        <Outlet />
      </div>
    </div>
  );
}

export default MainPage;
