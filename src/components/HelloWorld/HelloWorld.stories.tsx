import type { Meta, StoryObj } from '@storybook/react-vite';
import { HelloWorld } from './HelloWorld';

/**
 * HelloWorld - Reference Component
 * 
 * This component demonstrates the complete MDS development workflow:
 * - Token consumption via CSS variables
 * - TypeScript props with JSDoc
 * - Multiple variants
 * - Accessibility attributes
 * - Comprehensive tests
 * 
 * Use this as a template when creating new components.
 */
const meta = {
  title: 'Components/HelloWorld',
  component: HelloWorld,
  parameters: {
    docs: {
      description: {
        component:
          'A reference component that demonstrates MDS best practices. Consumes design tokens for all styling, includes accessibility attributes, and has comprehensive test coverage.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'Text content to display',
      table: {
        defaultValue: { summary: 'Hello MDS!' },
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'brand', 'accent'],
      description: 'Visual variant of the component',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS class name',
    },
  },
} satisfies Meta<typeof HelloWorld>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default variant with neutral colors
 */
export const Default: Story = {
  args: {
    text: 'Hello MDS!',
    variant: 'default',
  },
};

/**
 * Brand variant with brand colors
 */
export const Brand: Story = {
  args: {
    text: 'Hello from MDS!',
    variant: 'brand',
  },
};

/**
 * Accent variant with accent colors
 */
export const Accent: Story = {
  args: {
    text: 'Welcome to MDS!',
    variant: 'accent',
  },
};

/**
 * Custom text content
 */
export const CustomText: Story = {
  args: {
    text: 'This is a custom message demonstrating token-based theming!',
    variant: 'brand',
  },
};

