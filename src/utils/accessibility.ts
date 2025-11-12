/**
 * Accessibility utilities for MDS components
 * Provides helpers for focus management, ARIA attributes, and keyboard navigation
 */

/**
 * Manages focus trap for modal/dialog components
 * @param element - Container element to trap focus within
 */
export const createFocusTrap = (element: HTMLElement) => {
  const focusableSelectors =
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
  
  const getFocusableElements = () => {
    return Array.from(
      element.querySelectorAll<HTMLElement>(focusableSelectors)
    ).filter((el) => !el.hasAttribute('disabled'));
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'Tab') return;

    const focusableElements = getFocusableElements();
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement?.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement?.focus();
    }
  };

  element.addEventListener('keydown', handleKeyDown);

  return () => {
    element.removeEventListener('keydown', handleKeyDown);
  };
};

/**
 * Generates a unique ID for ARIA relationships
 * @param prefix - Prefix for the ID
 */
export const generateId = (prefix: string = 'mds'): string => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Announces a message to screen readers
 * @param message - Message to announce
 * @param priority - 'polite' or 'assertive'
 */
export const announceToScreenReader = (
  message: string,
  priority: 'polite' | 'assertive' = 'polite'
) => {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;

  document.body.appendChild(announcement);

  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

