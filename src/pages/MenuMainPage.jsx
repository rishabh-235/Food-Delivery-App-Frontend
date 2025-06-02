import React from 'react'
import './PagesStyle/menumain.css';
import { Outlet } from 'react-router-dom';

function MenuMainPage() {

  return (
    <div id='menu-main-page' className="menu-main-page-container">
        <Outlet />
    </div>
  )
}

export default MenuMainPage