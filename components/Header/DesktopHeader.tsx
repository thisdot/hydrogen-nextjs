"use client"
import clsx from 'clsx';
import { useWindowScroll } from 'react-use';

function DesktopHeader({
  isHome,
}: {
  isHome: boolean;
}) {
  const { y } = useWindowScroll();
  return (
    <header
      role="banner"
      className={`${isHome
        ? 'bg-primary/80 dark:bg-contrast/60 text-contrast dark:text-primary shadow-darkHeader'
        : 'bg-contrast/80 text-primary'
        } ${!isHome && y > 50 && 'shadow-lightHeader'
        } hidden h-nav lg:flex items-center sticky transition duration-300 backdrop-blur-lg z-40 top-0 justify-between w-full leading-none gap-8 px-12 py-8`}
    >
      <div className="flex gap-12">
        HEADER DESKTOP
      </div>
    </header>
  );
}

export default DesktopHeader
