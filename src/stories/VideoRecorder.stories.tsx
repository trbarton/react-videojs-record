import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { VideoRecorder } from "../components";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/VideoRecorder",
  component: VideoRecorder,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof VideoRecorder>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof VideoRecorder> = (args) => (
  <VideoRecorder />
);

export const Primary = Template.bind({});
