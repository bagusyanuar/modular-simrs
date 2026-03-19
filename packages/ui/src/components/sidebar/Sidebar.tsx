import { type ReactNode } from 'react';
import { SidebarItem } from './SidebarItem';
import type { NavItem } from '../layout/MainLayout';

interface SidebarProps {
  isCollapsed: boolean;
  navItems: NavItem[];
  appName: string;
  logo?: ReactNode;
  onToggle: () => void;
}

export function Sidebar({
  isCollapsed,
  navItems,
  appName,
  logo,
  onToggle,
}: SidebarProps) {
  return (
    <aside
      style={{
        width: isCollapsed
          ? 'var(--sidebar-collapsed-width)'
          : 'var(--sidebar-width)',
      }}
      className="flex flex-col h-full bg-aside border-r border-aside-border transition-all duration-300 overflow-hidden shrink-0"
    >
      <div className="flex items-center gap-3 px-4 h-15 border-b border-aside-border shrink-0">
        {logo && (
          <span className="w-8 h-8 shrink-0 flex items-center justify-center text-primary">
            {logo}
          </span>
        )}
        {!isCollapsed && (
          <span className="font-semibold text-primary truncate">
            {appName}
          </span>
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <SidebarItem key={item.path} item={item} isCollapsed={isCollapsed} />
        ))}
      </nav>

      {/* Toggle Button */}
      <div className="px-3 py-4 border-t border-aside-border shrink-0">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-ink-muted hover:bg-primary-subtle hover:text-primary transition-colors duration-150"
        >
          <svg
            className={`w-5 h-5 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
          {!isCollapsed && <span className="text-sm">Ciutkan</span>}
        </button>
      </div>
    </aside>
  );
}
