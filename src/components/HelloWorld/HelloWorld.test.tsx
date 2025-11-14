/**
 * Tests for HelloWorld component
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../tests/utils/test-helpers';
import { HelloWorld } from './HelloWorld';

describe('HelloWorld', () => {
  describe('Rendering', () => {
    it('renders with default text', () => {
      render(<HelloWorld />);
      expect(screen.getByText('Hello MDS!')).toBeInTheDocument();
    });

    it('renders with custom text', () => {
      render(<HelloWorld text="Custom text" />);
      expect(screen.getByText('Custom text')).toBeInTheDocument();
    });

    it('has role region', () => {
      render(<HelloWorld />);
      expect(screen.getByRole('region')).toBeInTheDocument();
    });

    it('has accessible label', () => {
      render(<HelloWorld />);
      expect(screen.getByRole('region')).toHaveAttribute(
        'aria-label',
        'HelloWorld component'
      );
    });
  });

  describe('Variants', () => {
    it('applies default variant class', () => {
      render(<HelloWorld variant="default" />);
      const element = screen.getByRole('region');
      expect(element).toHaveClass('hello-world');
      expect(element).toHaveClass('hello-world--default');
    });

    it('applies brand variant class', () => {
      render(<HelloWorld variant="brand" />);
      const element = screen.getByRole('region');
      expect(element).toHaveClass('hello-world--brand');
    });

    it('applies accent variant class', () => {
      render(<HelloWorld variant="accent" />);
      const element = screen.getByRole('region');
      expect(element).toHaveClass('hello-world--accent');
    });
  });

  describe('Props', () => {
    it('accepts custom className', () => {
      render(<HelloWorld className="custom-class" />);
      const element = screen.getByRole('region');
      expect(element).toHaveClass('hello-world');
      expect(element).toHaveClass('custom-class');
    });

    it('combines all classes correctly', () => {
      render(<HelloWorld variant="brand" className="custom" />);
      const element = screen.getByRole('region');
      expect(element).toHaveClass('hello-world');
      expect(element).toHaveClass('hello-world--brand');
      expect(element).toHaveClass('custom');
    });
  });

  describe('Accessibility', () => {
    it('has semantic HTML structure', () => {
      const { container } = render(<HelloWorld />);
      const paragraph = container.querySelector('p');
      expect(paragraph).toBeInTheDocument();
      expect(paragraph).toHaveClass('hello-world__text');
    });
  });
});

