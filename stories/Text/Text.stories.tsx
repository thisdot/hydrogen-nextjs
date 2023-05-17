import { Text, Heading, Section, PageHeader } from "../../components/Text";
import { StoryFn, Meta } from '@storybook/react';

export default {
  title: "Text components",
  component: Text,
  argTypes: {
    color: {
      control: {
        type: 'select',
        options: ['default', 'primary', 'subtle', 'notice', 'contrast'],
      },
    },
    size: {
      control: {
        type: 'select',
        options: ['lead', 'copy', 'fine'],
      },
    },
    width: {
      control: {
        type: 'select',
        options: ['default', 'narrow', 'wide'],
      },
    },
  },
};

const TextComponent: StoryFn = (args: {
  color?: 'default' | 'primary' | 'subtle' | 'notice' | 'contrast';
  size?: 'lead' | 'copy' | 'fine';
  width?: 'default' | 'narrow' | 'wide';
}) => <Text {...args}>This is the text component</Text>
// export const HeadingComponent = () => <Heading>This is the heading component</Heading>
// export const SectionComponent = () => <Section heading={'heading'}>This is the section component</Section>
// export const PageHeaderComponent = () => <PageHeader heading={'heading'}>This is the page header component</PageHeader>
export const Default = TextComponent.bind({});

Default.args = {
  color: 'default',
  size: 'lead',
  width: 'default',
};
