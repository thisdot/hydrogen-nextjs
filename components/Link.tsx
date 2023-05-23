"use client";
import { default as NextLink, LinkProps as NextLinkProps } from "next/link";
type LinkProps = Omit<NextLinkProps, "className"> & {
  className?:
    | string
    | ((props: { isActive: boolean }) => string | undefined)
    | undefined;
  children: React.ReactNode;
};

export function Link(props: LinkProps) {
  let { href, className, ...resOfProps } = props;

  let toWithLocale = href;

  if (typeof className === "function") {
    className = className({
      isActive: window.location.pathname === href,
    });
  }

  return (
    <NextLink href={toWithLocale} className={className} {...resOfProps}>
      {props.children}
    </NextLink>
  );
}
