import { CartLineInput } from "@/lib/shopify/types";
import { Button } from "./Button";
export function AddToCartButton({
  children,
  lines,
  className = '',
  variant = 'primary',
  width = 'full',
  disabled,
  analytics,
  ...props
}: {
  children: React.ReactNode;
  lines: CartLineInput[];
  className?: string;
  variant?: 'primary' | 'secondary' | 'inline';
  width?: 'auto' | 'full';
  disabled?: boolean;
  analytics?: unknown;
  [key: string]: any;
}) {

  return (
    <form action="/cart" method="post">
      <input type="hidden" name="cartAction" value={'ADD_TO_CART'} />
      <input type="hidden" name="countryCode" value={'US'} />
      <input type="hidden" name="lines" value={JSON.stringify(lines)} />
      <Button
        as="button"
        type="submit"
        width={width}
        variant={variant}
        className={className}
        disabled={disabled}
        {...props}
      >
        {children}
      </Button>
    </form>
  );
}
