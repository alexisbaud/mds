/**
 * Tests for accessibility utilities
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { generateId, createFocusTrap, announceToScreenReader } from './accessibility';

describe('Accessibility Utils', () => {
  describe('generateId', () => {
    it('generates IDs with default prefix', () => {
      const id = generateId();
      expect(id).toMatch(/^mds-[a-z0-9]+$/);
    });

    it('generates IDs with custom prefix', () => {
      const id = generateId('button');
      expect(id).toMatch(/^button-[a-z0-9]+$/);
    });

    it('generates unique IDs', () => {
      const id1 = generateId('test');
      const id2 = generateId('test');
      
      expect(id1).not.toBe(id2);
    });

    it('generates IDs of reasonable length', () => {
      const id = generateId('test');
      expect(id.length).toBeGreaterThan(5);
      expect(id.length).toBeLessThan(20);
    });
  });

  describe('createFocusTrap', () => {
    let container: HTMLElement;
    let button1: HTMLButtonElement;
    let button2: HTMLButtonElement;
    let button3: HTMLButtonElement;

    beforeEach(() => {
      container = document.createElement('div');
      button1 = document.createElement('button');
      button2 = document.createElement('button');
      button3 = document.createElement('button');
      
      button1.textContent = 'Button 1';
      button2.textContent = 'Button 2';
      button3.textContent = 'Button 3';
      
      container.appendChild(button1);
      container.appendChild(button2);
      container.appendChild(button3);
      
      document.body.appendChild(container);
    });

    afterEach(() => {
      document.body.removeChild(container);
    });

    it('returns a cleanup function', () => {
      const cleanup = createFocusTrap(container);
      expect(cleanup).toBeInstanceOf(Function);
      cleanup();
    });

    it('traps focus within container on Tab', () => {
      const cleanup = createFocusTrap(container);
      
      // Focus last button
      button3.focus();
      expect(document.activeElement).toBe(button3);
      
      // Tab from last button should cycle to first
      const event = new KeyboardEvent('keydown', {
        key: 'Tab',
        bubbles: true,
        cancelable: true,
      });
      
      container.dispatchEvent(event);
      
      cleanup();
    });

    it('traps focus on Shift+Tab', () => {
      const cleanup = createFocusTrap(container);
      
      // Focus first button
      button1.focus();
      expect(document.activeElement).toBe(button1);
      
      // Shift+Tab from first button should cycle to last
      const event = new KeyboardEvent('keydown', {
        key: 'Tab',
        shiftKey: true,
        bubbles: true,
        cancelable: true,
      });
      
      container.dispatchEvent(event);
      
      cleanup();
    });

    it('ignores non-Tab keys', () => {
      const cleanup = createFocusTrap(container);
      
      button1.focus();
      
      const event = new KeyboardEvent('keydown', {
        key: 'Enter',
        bubbles: true,
      });
      
      container.dispatchEvent(event);
      
      // Focus should not change
      expect(document.activeElement).toBe(button1);
      
      cleanup();
    });

    it('cleans up event listeners when cleanup is called', () => {
      const cleanup = createFocusTrap(container);
      
      // Spy on removeEventListener
      const spy = vi.spyOn(container, 'removeEventListener');
      
      cleanup();
      
      expect(spy).toHaveBeenCalledWith('keydown', expect.any(Function));
      
      spy.mockRestore();
    });
  });

  describe('announceToScreenReader', () => {
    afterEach(() => {
      // Clean up any announcement divs
      document.querySelectorAll('[role="status"]').forEach((el) => el.remove());
    });

    it('creates announcement element with polite priority', () => {
      announceToScreenReader('Test message');
      
      const announcement = document.querySelector('[role="status"]');
      expect(announcement).toBeTruthy();
      expect(announcement?.getAttribute('aria-live')).toBe('polite');
      expect(announcement?.getAttribute('aria-atomic')).toBe('true');
      expect(announcement?.textContent).toBe('Test message');
    });

    it('creates announcement element with assertive priority', () => {
      announceToScreenReader('Urgent message', 'assertive');
      
      const announcement = document.querySelector('[role="status"]');
      expect(announcement).toBeTruthy();
      expect(announcement?.getAttribute('aria-live')).toBe('assertive');
    });

    it('adds sr-only class to announcement', () => {
      announceToScreenReader('Test message');
      
      const announcement = document.querySelector('[role="status"]');
      expect(announcement?.className).toContain('sr-only');
    });

    it('removes announcement after timeout', async () => {
      vi.useFakeTimers();
      
      announceToScreenReader('Test message');
      
      expect(document.querySelector('[role="status"]')).toBeTruthy();
      
      // Fast-forward time
      vi.advanceTimersByTime(1000);
      
      expect(document.querySelector('[role="status"]')).toBeFalsy();
      
      vi.useRealTimers();
    });
  });
});

