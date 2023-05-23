import { Button } from "./Button";

// this component will be wrapped inside a Form but for now we need only the UI
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
  // this type should be CartLineInput from @shopify/hydrogen/storefront-api-types
  lines: any;
  className?: string;
  variant?: 'primary' | 'secondary' | 'inline';
  width?: 'auto' | 'full';
  disabled?: boolean;
  analytics?: unknown;
  [key: string]: any;
}) {

  return (
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
  );
}
