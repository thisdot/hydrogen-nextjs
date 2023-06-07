import { useCallback } from 'react';
import { useLocation } from 'react-use';

const useProductOption = () => {
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
		const checked = searchParamExists(name) === value;
		return checked;
	};

	const searchDefaultOption = (
		name: string,
		value: string,
		firstValue: string
	) => {
		return !searchParamExists(name) && value === firstValue;
	};

	return { isChecked, searchDefaultOption, searchParamExists };
};

export default useProductOption;
