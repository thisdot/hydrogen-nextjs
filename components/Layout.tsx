import DesktopHeader from './Header/DesktopHeader';
import MobileHeader from './Header/MobileHeader';
import { Section } from './Text';

export function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="">
          <a href="#mainContent" className="sr-only">
            Skip to content
          </a>
        </div>
        <Header
        />
        <main role="main" id="mainContent" className="flex-grow">
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
}

function Header() {
  //Fake data, remove when real data is available
  const isHome = true;

  return (
    <>
      <DesktopHeader
        isHome={isHome}
      />
      <MobileHeader
        isHome={isHome}
      />
    </>
  );
}

function Footer() {
  //Fake data, remove when real data is available
  const isHome = true;
  //Fake data, remove when real data is available
  const itemsCount = 4;

  return (
    <Section
      divider={isHome ? 'none' : 'top'}
      as="footer"
      role="contentinfo"
      className={`grid min-h-[25rem] items-start grid-flow-row w-full gap-6 py-8 px-6 md:px-8 lg:px-12 md:gap-8 lg:gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-${itemsCount}
        bg-primary dark:bg-contrast dark:text-primary text-contrast overflow-hidden`}
    >
      <div
        className={`self-end pt-8 opacity-50 md:col-span-2 lg:col-span-${itemsCount}`}
      >
        {new Date().getFullYear()} / This Dot Labs, Inc. Hydrogen Next.js 13 Template is an MIT
        Licensed Open Source project.
      </div>
    </Section>
  );
}

