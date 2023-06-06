const NumericIput = ({ line }: { line: any }) => {
  if (!line || typeof line?.quantity === "undefined") return null;
  const { id: lineId, quantity } = line;
  const prevQuantity = Number(Math.max(0, quantity - 1).toFixed(0));
  const nextQuantity = Number((quantity + 1).toFixed(0));

  return (
    <>
      <label htmlFor={`quantity-${lineId}`} className="sr-only">
        Quantity, {quantity}
      </label>
      <div className="flex items-center border rounded">
        <div>
          <button
            name="decrease-quantity"
            aria-label="Decrease quantity"
            className="w-10 h-10 transition text-primary/50 hover:text-primary disabled:text-primary/10"
            value={prevQuantity}
            disabled={quantity <= 1}
          >
            <span>&#8722;</span>
          </button>
        </div>

        <div className="px-2 text-center" data-test="item-quantity">
          {quantity}
        </div>

        <div>
          <button
            className="w-10 h-10 transition text-primary/50 hover:text-primary"
            name="increase-quantity"
            value={nextQuantity}
            aria-label="Increase quantity"
          >
            <span>&#43;</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default NumericIput;
