import { useState } from "react";

type IAction = "plus" | "minus";
interface INumericIput {
  line: any;
  onClick: (action: IAction) => void;
}

const NumericIput = ({ line, onClick }: INumericIput) => {
  const [itemQuantity, setItemQuantity] = useState<number>(line.quantity || 0);

  if (!line || typeof line?.quantity === "undefined") return null;
  const { id: lineId, quantity } = line;
  const prevQuantity = Number(Math.max(0, quantity - 1).toFixed(0));
  const nextQuantity = Number((quantity + 1).toFixed(0));

  const modifyQuantity = (action: IAction) => {
    setItemQuantity((prev) =>
      action === "plus"
        ? prev + 1
        : action === "minus" && prev > 1
        ? prev - 1
        : 0
    );

    onClick(action);
  };

  return (
    <>
      <label htmlFor={`quantity-${lineId}`} className="sr-only">
        Quantity, {itemQuantity}
      </label>
      <div className="flex justify-center items-center border rounded">
        <button
          name="decrease-quantity"
          aria-label="Decrease quantity"
          className="w-10 h-10 transition text-primary/50 hover:text-primary disabled:text-primary/10 outline-none"
          value={prevQuantity}
          disabled={itemQuantity <= 1}
          onClick={() => modifyQuantity("minus")}
        >
          <span>&#8722;</span>
        </button>

        <div className="px-2 text-center" data-test="item-quantity">
          {itemQuantity}
        </div>

        <button
          className="w-10 h-10 transition text-primary/50 hover:text-primary outline-none"
          name="increase-quantity"
          value={nextQuantity}
          aria-label="Increase quantity"
          onClick={() => modifyQuantity("plus")}
        >
          <span>&#43;</span>
        </button>
      </div>
    </>
  );
};

export default NumericIput;
