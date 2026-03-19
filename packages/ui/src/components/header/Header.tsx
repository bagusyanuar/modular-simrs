import { type ReactNode } from 'react';

interface HeaderProps {
  isCollapsed: boolean;
  onToggle: () => void;
  userMenu?: ReactNode;
}

export function Header({ isCollapsed, onToggle, userMenu }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 h-[var(--header-height)] bg-[var(--color-header)] border-b border-[var(--color-header-border)] flex-shrink-0">
      {/* Toggle button mobile */}
      <button
        onClick={onToggle}
        className="p-2 rounded-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-primary-light)] hover:text-[var(--color-primary)] transition-colors duration-150 lg:hidden"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isCollapsed ? 'M4 6h16M4 12h16M4 18h16' : 'M6 18L18 6M6 6l12 12'}
          />
        </svg>
      </button>

      {/* Right side */}
      <div className="flex items-center gap-3 ml-auto">
        {/* Dark mode toggle */}
        <DarkModeToggle />

        {/* User menu */}
        {userMenu && userMenu}
      </div>
    </header>
  );
}

function DarkModeToggle() {
  const toggleDark = () => {
    document.documentElement.classList.toggle('dark');
  };

  return (
    <button
      onClick={toggleDark}
      className="p-2 rounded-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-primary-light)] hover:text-[var(--color-primary)] transition-colors duration-150"
    >
      <svg
        className="w-5 h-5 dark:hidden"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
      <svg
        className="w-5 h-5 hidden dark:block"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    </button>
  );
}
