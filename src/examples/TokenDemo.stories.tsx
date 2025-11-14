import type { Meta, StoryObj } from '@storybook/react-vite';
import { TokenDemo } from './TokenDemo';

/**
 * TokenDemo illustrates how design tokens are consumed through CSS variables.
 * 
 * This example demonstrates:
 * - Semantic tokens for colors (surface, content, action)
 * - Spacing tokens (inset, stack, layout)
 * - Typography tokens (heading, body, caption)
 * - Border radius tokens
 * - Elevation (box-shadow) tokens
 * 
 * All styles reference CSS variables generated from JSON token files.
 * NO magic values - everything flows through the token system.
 */
const meta = {
  title: 'Examples/Token Demo',
  component: TokenDemo,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Démonstration de la consommation des design tokens via variables CSS. Tous les styles (couleurs, espacements, typographies) proviennent des tokens sémantiques.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TokenDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default demonstration of token consumption.
 * Open the browser inspector to see the CSS variables in action.
 */
export const Default: Story = {};

