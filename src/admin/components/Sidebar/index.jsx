import React from 'react'
import {  NavLink } from 'react-router-dom'
import {menuItem} from '../../../data/contants'
import './index.scss'

function Sidebar({ sidebarOpen, closeSidebar }) {

  return (
    <div className={sidebarOpen ? "sidebar_responsive" : "sidebar"}>
    <div className="sidebar__content">
      <div className="sidebar__title">
        <div className="sidebar__img">
          {/* <img src={logo} alt="logo" /> */}
          <h1>Fashion</h1>
        </div>
        <i
          onClick={() => closeSidebar()}
          className="fa fa-times"
          id="sidebarIcon"
          aria-hidden="true"
        ></i>
      </div>
      <div className="sidebar__menu">
        <ul className='nav__link'>
              {
                menuItem.map((data,index) =>{
                return(
                  <li key={index}>
                    <NavLink to={data.url} className={(navClass) => navClass.isActive ? 'sidebar__active' : null}>
                        <i>{data.icon}</i>
                      <span>{data.name}</span>
                    </NavLink>
                  </li>
                )
                })
              }        
            </ul>
      </div>
    </div>
  </div>
  )
}

export default Sidebar
