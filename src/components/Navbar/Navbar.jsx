import React from 'react'
import PetsIcon from '@mui/icons-material/Pets';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import './style.scss'

function Navbar() {
  return (
    <header>
        <p className='title'>Admin Panel</p>
        <div className='icons_container'>
            <div className='icon margin_rigth_10'>
                <NotificationsIcon className='element'/>
            </div>
            <div className='icon margin_rigth_10'>
                <SettingsIcon className='element'/>
            </div>
            <div className='icon'>
                <PetsIcon className='element'/>
            </div>
        </div>
    </header>
  )
}

export default Navbar