import { menuItemsData } from '../assets/assets'
import { NavLink } from 'react-router-dom'

const MenuItems = ({ setSidebarOpen }) => {
  const handleClick = () => {
    // Close sidebar only on small screens
    if (window.innerWidth < 640) {
      setSidebarOpen(false)
    }
  }

  return (
    <div className="px-6 text-gray-600 space-y-1 font-medium">
      {menuItemsData.map(({ to, label, Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          onClick={handleClick}
          className={({ isActive }) =>
            `flex items-center gap-4 px-4 py-3 rounded-lg transition-colors
            ${
              isActive
                ? 'bg-gray-200 text-indigo-700'
                : 'hover:bg-gray-50'
            }`
          }
        >
          <Icon className="w-5 h-5" />
          <span>{label}</span>
        </NavLink>
      ))}
    </div>
  )
}

export default MenuItems
