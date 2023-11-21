import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Router from './Router'
import Navbar from '../../components/Navbar/Navbar'
import SidebarApp from '../../components/Sidebar/Sidebar'
import '../../index.scss'

function Main() {
  return (
    <div className='app'>
      <BrowserRouter>
        <SidebarApp />
        <main className='content'>
          <Navbar />
          <div className='container'>
            <Router />
          </div>
        </main>
      </BrowserRouter>
    </div>
  )
}

export default Main