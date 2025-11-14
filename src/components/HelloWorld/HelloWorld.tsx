/**
 * HelloWorld Component
 * 
 * A minimal reference component that demonstrates:
 * - Token consumption through CSS variables
 * - Proper TypeScript typing with JSDoc
 * - Accessibility attributes
 * - Testing patterns
 * 
 * This component serves as a template for future components.
 */

import './HelloWorld.css';

export interface HelloWorldProps {
  /**
   * Text content to display
   * @default 'Hello MDS!'
   */
  text?: string;

  /**
   * Visual variant of the component
   * @default 'default'
   */
  variant?: 'default' | 'brand' | 'accent';

  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * HelloWorld - Reference component for MDS
 * 
 * Demonstrates proper token consumption, accessibility, and testing patterns.
 */
export const HelloWorld = ({
  text = 'Hello MDS!',
  variant = 'default',
  className,
}: HelloWorldProps) => {
  const variantClass = `hello-world--${variant}`;
  const classes = ['hello-world', variantClass, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} role="region" aria-label="HelloWorld component">
      <p className="hello-world__text">{text}</p>
    </div>
  );
};

