import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

import Sidebar from '../components/Sidebar'
import Loading from '../components/Loading'
import { dummyUserData } from '../assets/assets'

const Layout = () => {
  const user = dummyUserData
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (!user) {
    return <Loading />
  }

  return (
    <div className="w-full h-screen flex relative">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 bg-slate-50">
        <Outlet />
      </div>

      {/* Mobile Toggle Button */}
      {sidebarOpen ? (
        <X
          className="absolute top-3 right-3 z-50 bg-white rounded-md shadow w-10 h-10 p-2 text-gray-600 sm:hidden cursor-pointer"
          onClick={() => setSidebarOpen(false)}
        />
      ) : (
        <Menu
          className="absolute top-3 right-3 z-50 bg-white rounded-md shadow w-10 h-10 p-2 text-gray-600 sm:hidden cursor-pointer"
          onClick={() => setSidebarOpen(true)}
        />
      )}
    </div>
  )
}

export default Layout
