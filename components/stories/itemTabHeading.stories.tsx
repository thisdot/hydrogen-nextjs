import { Meta, StoryFn } from '@storybook/react';

import ItemTabHeading from '../ItemTabHeading';

export default {
	title: 'Components/ItemTabHeading',
	component: ItemTabHeading,
} as Meta;

const SizeTemplate: StoryFn = () => (
	<ItemTabHeading
		options={[
			{ optionName: 'Size', optionValue: '154cm' },
			{ optionName: 'Size', optionValue: '158cm' },
			{ optionName: 'Size', optionValue: '160cm' },
		]}
	/>
);

export const Size = SizeTemplate.bind({});

const BindingTemplate: StoryFn = () => (
	<ItemTabHeading
		options={[
			{ optionName: 'Binding mount', optionValue: 'Nested' },
			{ optionName: 'Binding mount', optionValue: 'Optimistic' },
		]}
	/>
);

export const BindingMount = BindingTemplate.bind({});
