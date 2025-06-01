import dashboardIcon from '../assets/material-symbols_dashboard-rounded.png';
import chairIcon from '../assets/mdi_seat.png';
import orderBookIcon from '../assets/bxs_food-menu.png';
import analyticsIcon from '../assets/mdi_analytics.png';
import './styles/navbar.css'
import { NavLink } from 'react-router-dom';

function NavBar() {
  return (
      <ul className='navbar-list'>
        <li ><NavLink className={({isActive})=> isActive ? 'selected-navbar-item' : ''} to="/"><img width={20} height={20} src={dashboardIcon} alt="Dashboard" /></NavLink></li>
        <li><NavLink className={({isActive})=> isActive ? 'selected-navbar-item' : ''} to="/edit-tables"><img width={20} height={20} src={chairIcon} alt="Chair" /></NavLink></li>
        <li><NavLink className={({isActive})=> isActive ? 'selected-navbar-item' : ''} to="/order-book"><img width={20} height={20} src={orderBookIcon} alt="Order Book" /></NavLink></li>
        <li><NavLink className={({isActive})=> isActive ? 'selected-navbar-item' : ''} to="/order-food"><img width={20} height={20} src={analyticsIcon} alt="menu" /></NavLink></li>
      </ul>
  )
}

export default NavBar