import { Meta, StoryFn } from "@storybook/react";
import NumericIput from "../NumericInput";


export default {
  title: "Components/Numericinput",
  component: NumericIput,
} as Meta;

const Template: StoryFn = () => <NumericIput line={{id: 'sjhashj', quantity: 1}} />;

export const Default = Template.bind({});