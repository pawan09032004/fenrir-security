import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { showToast } from '../ui/Toast'
import {
  LayoutDashboard, FolderOpen, ScanLine, Calendar,
  Bell, Settings, HelpCircle, ChevronRight, Menu, X,
} from 'lucide-react'
import { ThemeToggle } from '../ui/ThemeToggle'

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { id: 'projects', label: 'Projects', icon: FolderOpen, path: '/projects' },
  { id: 'scans', label: 'Scans', icon: ScanLine, path: '/scans' },
  { id: 'schedule', label: 'Schedule', icon: Calendar, path: '/schedule' },
]

const bottomNavItems = [
  { id: 'notifications', label: 'Notifications', icon: Bell, path: '/notifications', badge: true },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
  { id: 'support', label: 'Support', icon: HelpCircle, path: '/support' },
]

export function Sidebar({ activeItem }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  const currentActive = activeItem || (
    navItems.find(i => location.pathname.startsWith(i.path))?.id ||
    bottomNavItems.find(i => location.pathname.startsWith(i.path))?.id ||
    'dashboard'
  )

  const implementedPaths = ['/dashboard', '/scans']

  const handleNav = (path) => {
    if (!implementedPaths.includes(path)) {
      showToast('This feature is coming soon!', 'info')
      setMobileOpen(false)
      return
    }
    // /scans is the scan list — same view as /dashboard
    navigate(path === '/scans' ? '/dashboard' : path)
    setMobileOpen(false)
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-gray-200 dark:border-dark-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-xs">F</span>
          </div>
          <span className="font-bold text-gray-900 dark:text-white text-lg tracking-tight">fenrir</span>
        </div>
        <ThemeToggle />
      </div>

      {/* Top Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ id, label, icon: Icon, path }) => {
          const isActive = currentActive === id
          return (
            <button
              key={id}
              onClick={() => handleNav(path)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group
                ${isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
                }`}
            >
              <Icon size={18} className={isActive ? 'text-primary' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'} />
              {label}
            </button>
          )
        })}
      </nav>

      {/* Bottom Nav */}
      <div className="px-3 pb-4 space-y-1 border-t border-gray-200 dark:border-dark-border pt-3">
        {bottomNavItems.map(({ id, label, icon: Icon, path, badge }) => {
          const isActive = currentActive === id
          return (
            <button
              key={id}
              onClick={() => handleNav(path)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group
                ${isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
                }`}
            >
              <div className="relative">
                <Icon size={18} className={isActive ? 'text-primary' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'} />
                {badge && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-critical" />
                )}
              </div>
              {label}
            </button>
          )
        })}
      </div>

      {/* User Profile */}
      <div className="px-3 pb-4">
        <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 cursor-pointer transition-all group">
          <div className="w-9 h-9 rounded-full bg-amber-400 flex items-center justify-center flex-shrink-0">
            <span className="text-amber-900 font-bold text-sm">A</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">admin@edu.com</p>
            <p className="text-xs text-gray-400 truncate">Security Lead</p>
          </div>
          <ChevronRight size={14} className="text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white flex-shrink-0" />
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile hamburger */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-dark-bgSecondary border border-gray-200 dark:border-dark-border text-gray-400"
        onClick={() => setMobileOpen(prev => !prev)}
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside className={`lg:hidden fixed top-0 left-0 z-40 h-full w-64 bg-white dark:bg-dark-bgSecondary border-r border-gray-200 dark:border-dark-border transform transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <SidebarContent />
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 flex-shrink-0 border-r border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bgSecondary h-screen sticky top-0">
        <SidebarContent />
      </aside>
    </>
  )
}
