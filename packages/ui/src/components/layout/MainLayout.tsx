import { type ReactNode } from 'react';
import { useSidebar } from '../../hooks/useSidebar';
import { Sidebar } from '../sidebar';
import { Header } from '../header';
import { Outlet } from 'react-router-dom';

export interface NavItem {
  label: string;
  path: string;
  icon?: ReactNode;
  children?: NavItem[];
}

export interface MainLayoutProps {
  navItems: NavItem[];
  appName?: string;
  logo?: ReactNode;
  userMenu?: ReactNode;
}

export function MainLayout({
  navItems,
  appName = 'Genmedical',
  logo,
  userMenu,
}: MainLayoutProps) {
  const { isCollapsed, toggle } = useSidebar();

  return (
    <div className="flex h-screen overflow-hidden bg-canvas">
      <Sidebar
        isCollapsed={isCollapsed}
        navItems={navItems}
        appName={appName}
        logo={logo}
        onToggle={toggle}
      />
      <div className="flex flex-col flex-1 overflow-hidden transition-all duration-300">
        <Header
          isCollapsed={isCollapsed}
          onToggle={toggle}
          userMenu={userMenu}
        />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
