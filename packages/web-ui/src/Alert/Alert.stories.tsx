import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';
import { Flex } from '../Flex';
import { COLOR_SCHEME } from '../types';

const colorSchemes = [
  COLOR_SCHEME.cyan,
  COLOR_SCHEME.red,
  COLOR_SCHEME.green,
  COLOR_SCHEME.gold,
] as const;

const meta: Meta<typeof Alert> = {
  title: 'Web UI / Components / Alert',
  component: Alert,
  argTypes: {
    children: { control: { type: 'text' } },
    colorScheme: { options: colorSchemes, control: { type: 'radio' } },
    direction: { options: ['column', 'row'], control: { type: 'radio' } },
  },
  args: {
    title: 'Alert title',
    text: 'Alert text purus odio, maximus tincidunt aliquet posuere, mollis ut mauris.',
    linkText: 'Alert link',
    linkHref: '#',
    colorScheme: COLOR_SCHEME.cyan,
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const KitchenSink: Story = {
  parameters: { controls: { hideNoControlsWarning: true } },
  render: () => {
    return (
      <Flex direction="column" gap={2}>
        {colorSchemes.map(colorScheme => (
          <Flex key={colorScheme} direction="column" gap={2}>
            <Alert
              colorScheme={colorScheme}
              direction="row"
              title="AlertTitle"
              text="Alert text purus odio, maximus tincidunt aliquet posuere, mollis ut mauris."
              linkText="Alert link"
              linkHref="#"
            />
            <Alert
              colorScheme={colorScheme}
              direction="column"
              title="AlertTitle"
              text="Alert text purus odio, maximus tincidunt aliquet posuere, mollis ut mauris. Mauris nibh quam, hendrerit mattis ligula sit amet."
              linkText="Alert link"
              linkHref="#"
            />
            <Alert
              colorScheme={colorScheme}
              direction="row"
              text="Alert text purus odio, maximus tincidunt aliquet posuere, mollis ut mauris."
              title="Alert title"
              linkText="Alert link"
              linkHref="#"
              onDismiss={() => alert('dismissed')}
            />
            <Alert
              colorScheme={colorScheme}
              direction="column"
              title="Alert title"
              text="Alert text purus odio, maximus tincidunt aliquet posuere, mollis ut mauris. Mauris nibh quam, hendrerit mattis ligula sit amet."
              linkText="Alert link"
              linkHref="#"
              onDismiss={() => alert('dismissed')}
            />
            <Alert
              colorScheme={colorScheme}
              direction="row"
              title="Alert title"
              text="Alert text purus odio, maximus tincidunt aliquet posuere, mollis ut mauris."
              linkHref="#"
            />
            <Alert
              colorScheme={colorScheme}
              direction="column"
              title="Alert title"
              text="Alert text purus odio, maximus tincidunt aliquet posuere, mollis ut mauris. Mauris nibh quam, hendrerit mattis ligula sit amet."
              linkHref="#"
            />
          </Flex>
        ))}
      </Flex>
    );
  },
};

export const Workshop: Story = {};
