import clsx from "clsx";
import { useLocation } from "react-use";
import ProductOptionLink from "./ProductOptionLink";
import { Text } from "./Text";
import { useCallback } from "react";

interface IOption {
  optionName: string;
  optionValue: string;
}
export interface IItemTabHeading {
  options: IOption[];
}

const ItemTabHeading = ({ options = [] }: IItemTabHeading) => {
  const { search } = useLocation();

  const searchParamExists = useCallback(
    (name: string) => {
      const clonedParams = new URLSearchParams(search);
      const hasSearch = clonedParams.get(name);
      return hasSearch;
    },
    [search]
  );

  const isChecked = (name: string, value: string) => {
    const clonedParams = new URLSearchParams(search);
    const checked = clonedParams.get(name) === value;

    return checked;
  };

  const searchDefaultOption = (
    name: string,
    value: string,
    optionValue: string
  ) => {
    return !searchParamExists(name) && value === optionValue;
  };

  return (
    <div className="flex flex-wrap items-baseline gap-4">
      {options.map((res, index) => {
        const checked = isChecked(res.optionName, res.optionValue);
        const id = `option-${index}-${res.optionValue}`;
        return (
          <Text key={id}>
            <ProductOptionLink
              optionName={res.optionName}
              optionValue={res.optionValue}
              className={clsx(
                "leading-none py-1 border-b-[1.5px] cursor-pointer transition-all duration-200 border-primary/0",
                {
                  "border-primary/50":
                    checked ||
                    searchDefaultOption(
                      res.optionName,
                      res.optionValue,
                      options[0].optionValue
                    ),
                }
              )}
            />
          </Text>
        );
      })}
    </div>
  );
};

export default ItemTabHeading;
