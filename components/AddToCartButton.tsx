import { CartLineInput } from "@/lib/shopify/types";
import { Button } from "./Button";
export function AddToCartButton({
  children,
  lines,
  className = "",
  variant = "primary",
  width = "full",
  disabled,
  analytics,
  ...props
}: {
  children: React.ReactNode;
  lines: CartLineInput[];
  className?: string;
  variant?: "primary" | "secondary" | "inline";
  width?: "auto" | "full";
  disabled?: boolean;
  analytics?: unknown;
  [key: string]: any;
}) {
  return (
    <Button
      as="button"
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
