import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Button, ButtonSize, ButtonColor } from "./button";
import { FaRegCircle } from "react-icons/fa";

export default {
  title: "UI/Button",
  component: Button,
  argTypes: {
    children: {
      name: "CTA Text",
      control: {
        type: "text",
      },
    },
    state: {
      control: {
        type: "radio",
        options: ["default", "hover", "focused", "disabled"],
      },
    },
    icon: { table: { disable: true } },
    iconPosition: {
      control: {
        type: "radio",
        options: ["leading", "trailing", "only"],
      },
    },
  },
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = ({
  size,
  color,
  children,
  state,
  iconPosition,
}) => (
  <div style={{ padding: 50, height: 100 }}>
    <Button
      size={size}
      color={color}
      state={state}
      icon={<FaRegCircle />}
      iconPosition={iconPosition}
    >

export const Default = Template.bind({});
Default.args = {
  size: ButtonSize.medium,
  color: ButtonColor.primary,
  children: "Button CTA",
  iconPosition: "leading",
};
Default.parameters = {
  viewMode: "docs",
};
