import { Meta, StoryFn } from '@storybook/react';
import { Input } from '../Input';

export default {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    variant: {
        control: {
            type: 'select',
            options: ['search', 'minisearch'],
        }
    }
  },
} as Meta;

const Template: StoryFn = (args) => <Input variant={'search'} {...args} />;

export const Search = Template.bind({});
Search.args = {
    variant: 'search',
    placeholder: 'Search',
    type: 'search',
};

export const Minisearch = Template.bind({});
Minisearch.args = {
    variant: 'minisearch',
    placeholder: 'Search',
    type: 'search',
};
