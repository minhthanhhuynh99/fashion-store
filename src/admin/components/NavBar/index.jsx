import React from 'react'
import DehazeIcon from '@mui/icons-material/Dehaze';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import './index.scss'


function NavBar({  openSidebar }) {
  return (
    <div className='navbar__admin'>
    <div className="navbar__content">
       <div className="navbar__icon" onClick={() => openSidebar()}>
         <span><DehazeIcon className='icon__navbar'/></span>
       </div>
       <div className="navbar__search" >
       </div>
       <div className="profile__details">
            <div className='navbar__notify'>
              {/* message */}
               <div className='header__notify--header'>
                    <i className="fa-regular fa-envelope"></i>
                  <span className='counter__message'>0</span>
                </div>
                {/* infor */}
                <div className='header__notify--header'>
                  <i className="fa-regular fa-bell"></i>
                  <span className='counter__infor'>0</span>
                </div>
            </div>
          
            <div className='profile__admin'>
                <span><img src="https://kynguyenlamdep.com/wp-content/uploads/2022/08/avatar-co-gai-cuc-cool-ngau-600x592.jpg" alt="" /> </span>
                <i><KeyboardArrowDownIcon/></i>
            </div>
       </div>
    </div >
   </div>
  )
}
export default NavBar
