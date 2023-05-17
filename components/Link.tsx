import {default as NextLink, LinkProps as NextLinkProps} from "next/link";  
import { useRouter } from "next/router";
  type LinkProps = Omit<NextLinkProps, 'className'> & {
    className?: string | ((props: {
        isActive: boolean;
    }) => string | undefined) | undefined;
  };
  
  export function Link(props: LinkProps) {
    let {href, className, ...resOfProps} = props;
    const router = useRouter();
  
    let toWithLocale = href;

    if(typeof className === 'function') {
        className = className({
            isActive: router.pathname === href
        });
    }
 
    return <NextLink href={toWithLocale} className={className} {...resOfProps} />;
  }
  