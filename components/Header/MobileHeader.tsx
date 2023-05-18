import clsx from "clsx";
import { Heading } from "../Text";

function MobileHeader({
  isHome,
}: {
  isHome: boolean;
}) {

  return (
    <header
      role="banner"
      className={clsx(
        'flex lg:hidden items-center h-nav sticky backdrop-blur-lg z-40 top-0 justify-between w-full leading-none gap-4 px-4 md:px-8',
        {
          'bg-primary/80 dark:bg-contrast/60 text-contrast dark:text-primary shadow-darkHeader': isHome,
          'bg-contrast/80 text-primary': !isHome,
        }
      )}
    >
      <div className="flex items-center justify-start w-full gap-4">
        <div className="items-center gap-2 sm:flex"></div>
      </div>

      <div
        className="flex items-center self-stretch leading-[3rem] md:leading-[4rem] justify-center flex-grow w-full h-full"
      >
        <Heading
          className="font-bold text-center leading-none"
          as={isHome ? 'h1' : 'h2'}
        >
          HEDER MOBILE
        </Heading>
      </div>

      <div className="flex items-center justify-end w-full gap-4">
      </div>
    </header>
  );
}

export default MobileHeader