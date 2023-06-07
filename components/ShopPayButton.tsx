import { FC } from 'react';
import { Button } from './Button';
import { Link } from './Link';

interface ShopPayButtonProps {
  variantIds: string[];
  className?: string;
  variantIdsAndQuantities?: { [variantId: string]: number };
  width?: number;
  storeDomain: string;
}
const ShopPayButton: FC<ShopPayButtonProps> = ({
  variantIds,
  className,
  variantIdsAndQuantities,
  width,
  storeDomain,
  ...props
}) => {
  return (
    <Button
      as="button"
      className={className}
      width={width}
      variantIdsAndQuantities={variantIdsAndQuantities}
      variant='secondary'
      {...props}
    >
      <Link
        href={`https://${storeDomain}/checkout?step=contact_information&selectedProductIds=${variantIds.join(',')}`}
      >
        Shop Pay
      </Link>
    </Button >
  );
};
export default ShopPayButton;