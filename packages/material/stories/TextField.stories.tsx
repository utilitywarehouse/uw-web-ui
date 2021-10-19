import React from "react";
import { Story, Meta } from "@storybook/react";

import type { TextFieldProps } from "../src";
import { Background, TextField, BackgroundProps } from "../src";

export default {
  title: "TextField",
  component: TextField,
  argTypes: {
    backgroundColor: {
      control: {
        type: "inline-radio",
        options: ["level0", "level1", "level2", "level3", "level4", "level5"],
      },
    },
    status: {
      control: {
        type: "inline-radio",
        options: {
          Default: "",
          Success: "success",
          Error: "error",
        },
      },
    },
    disabled: {
      control: {
        type: "boolean",
      },
    },
    id: {
      control: {
        type: "text",
      },
    },
    label: {
      control: {
        type: "text",
      },
    },
    labelProps: {
      control: {
        type: "object",
        id: {
          control: {
            type: "text",
          },
        },
      },
    },
    helperText: {
      control: {
        type: "text",
      },
    },
    helperTextProps: {
      control: {
        type: "object",
        id: {
          control: {
            type: "text",
          },
        },
      },
    },
  },
  args: {
    backgroundColor: "level5",
    disabled: false,
    status: "",
    id: "customer-ui-textfield-input",
    label: "Label",
    labelProps: { id: "customer-ui-textfield-label" },
    helperText: "Helper text",
    helperTextProps: { id: "customer-ui-textfield-helpertext" },
    placeholder: "Placeholder",
  },
} as Meta;

interface StoryProps extends TextFieldProps {
  backgroundColor: BackgroundProps["backgroundColor"];
}

export const TextfieldStory: Story<StoryProps> = (args) => {
  const { backgroundColor, ...rest } = args;
  return (
    <Background
      backgroundColor={backgroundColor}
      sx={{
        padding: 6,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <TextField {...rest} />
    </Background>
  );
};

TextfieldStory.storyName = "TextField";
