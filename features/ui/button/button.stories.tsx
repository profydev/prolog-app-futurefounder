import React, { ButtonHTMLAttributes } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Button } from "./button";

export default {
  title: "UI/Button",
  component: Button,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (
  props: ButtonHTMLAttributes<HTMLButtonElement>,
) => (
  <div style={{ padding: 50 }}>
    <Button {...props} style={{ background: "green" }}>
      Test
    </Button>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  //   variant: "primary",
  //   size: ButtonSize.sm,
  //   color: ButtonColor.primary,
  //   children: "Label",
};
Default.parameters = {
  viewMode: "docs",
};
