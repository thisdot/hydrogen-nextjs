import { Meta, StoryFn } from "@storybook/react";
import { Link } from "../Link";

export default {
  title: "Components/Link",
  component: Link,
  argTypes: {
    className: {
      control: "text",
    },
    href: {
      control: "text",
    },
  },
} as Meta;

const Template: StoryFn = (args) => (
  <Link href="#" {...args}>
    Click me
  </Link>
);

export const Default = Template.bind({});
Default.args = {
  href: "#",
  className: "text-blue-500",
};
