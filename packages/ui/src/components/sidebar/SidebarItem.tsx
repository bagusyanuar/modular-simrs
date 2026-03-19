import { useState, type ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import type { NavItem } from '../layout/MainLayout';

interface SidebarItemProps {
  item: NavItem;
  isCollapsed: boolean;
}

export function SidebarItem({ item, isCollapsed }: SidebarItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  if (hasChildren) {
    return (
      <div>
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-primary-light)] hover:text-[var(--color-primary)] transition-colors duration-150"
        >
          {item.icon && (
            <span className="w-5 h-5 flex-shrink-0">{item.icon}</span>
          )}
          {!isCollapsed && (
            <>
              <span className="flex-1 text-sm font-medium text-left">
                {item.label}
              </span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </>
          )}
        </button>

        {isOpen && !isCollapsed && (
          <div className="ml-4 mt-1 space-y-1 border-l-2 border-[var(--color-border)] pl-3">
            {item.children?.map((child) => (
              <SidebarItem
                key={child.path}
                item={child}
                isCollapsed={isCollapsed}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-150 ${
          isActive
            ? 'bg-[var(--color-primary-light)] text-[var(--color-primary)] font-medium'
            : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-primary-light)] hover:text-[var(--color-primary)]'
        }`
      }
    >
      {item.icon && <span className="w-5 h-5 flex-shrink-0">{item.icon}</span>}
      {!isCollapsed && <span className="text-sm">{item.label}</span>}
    </NavLink>
  );
}
