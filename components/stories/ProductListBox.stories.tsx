import { Meta, StoryFn } from '@storybook/react';

import ProductListBox from '../ProductListBox';

export default {
	title: 'Components/Product List Box',
	component: ProductListBox,
} as Meta;

const Template: StoryFn = () => (
	<ProductListBox
		options={[
			{ optionName: 'Material', optionValue: 'Carbon-fiber' },
			{ optionName: 'Material', optionValue: 'Polycarbonate' },
			{ optionName: 'Material', optionValue: 'Fiberglass' },
			{ optionName: 'Material', optionValue: 'Kevlar®' },
			{ optionName: 'Material', optionValue: 'Polyethylene' },
			{ optionName: 'Material', optionValue: 'Vectran®' },
			{
				optionName: 'Material',
				optionValue: 'Ultra-high-molecular-weight polyethylene',
			},
			{ optionName: 'Material', optionValue: 'Wood-composite' },
		]}
	/>
);

export const Default = Template.bind({});
