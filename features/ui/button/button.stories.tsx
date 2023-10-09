import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Button, ButtonSize, ButtonColor } from "./button";

export default {
  title: "UI/Button",
  component: Button,
  argTypes: {
    state: {
      control: {
        type: "radio",
        options: ["default", "hover", "focused", "disabled"],
      },
    },
  },
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = ({ size, color, children, state }) => (
  <div style={{ padding: 50, height: 100 }}>
    <Button size={size} color={color} state={state}>
      {children}
    </Button>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  size: ButtonSize.medium,
  color: ButtonColor.primary,
  children: "Button CTA",
};
Default.parameters = {
  viewMode: "docs",
};
