import { Meta, StoryFn } from '@storybook/react';
import { Grid } from '../Grid';

export default {
  title: 'Components/Grid',
  component: Grid,
  argTypes: {
    flow: {
      control: 'select',
      options: ['row', 'col'],
    },
    gap: {
      control: 'select',
      options: ['default', 'blog'],
    },
    layout: {
      control: 'select',
      options: ['default', 'products', 'auto', 'blog'],
    }
  },
} as Meta;

const Template: StoryFn = (args) => {
  console.log(Array.from(Array(args.item).keys()), args.items)
  return (
    <Grid {...args}>
      {
        Array.from(Array(args.items).keys()).map((el) =>
          <div key={el} className='border border-red-500'>{`Item ${el}`}</div>)
      }
    </Grid>
  );
};


export const GridComponent = Template.bind({});
GridComponent.args = {};