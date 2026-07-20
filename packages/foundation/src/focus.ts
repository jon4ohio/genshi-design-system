export const FOCUS_VISIBLE_CLASS = 'gsh-focus-visible';

/** Apply keyboard-only focus ring styles via a shared class name. */
export const focusVisibleStyles = `
  outline: 2px solid var(--gsh-input-border-active, #2563eb);
  outline-offset: 2px;
`;

/** Returns true when the event likely originated from keyboard interaction. */
export function isKeyboardFocus(event: FocusEvent): boolean {
  return event.relatedTarget !== null || event.type === 'focus';
}

/** Toggle focus-visible class for pointer vs keyboard users. */
export function bindFocusVisible(element: HTMLElement): () => void {
  let hadKeyboardEvent = false;

  const onKeyDown = () => {
    hadKeyboardEvent = true;
  };

  const onPointerDown = () => {
    hadKeyboardEvent = false;
  };

  const onFocus = (event: FocusEvent) => {
    if (hadKeyboardEvent || isKeyboardFocus(event)) {
      element.classList.add(FOCUS_VISIBLE_CLASS);
    }
  };

  const onBlur = () => {
    element.classList.remove(FOCUS_VISIBLE_CLASS);
  };

  window.addEventListener('keydown', onKeyDown, true);
  window.addEventListener('pointerdown', onPointerDown, true);
  element.addEventListener('focus', onFocus);
  element.addEventListener('blur', onBlur);

  return () => {
    window.removeEventListener('keydown', onKeyDown, true);
    window.removeEventListener('pointerdown', onPointerDown, true);
    element.removeEventListener('focus', onFocus);
    element.removeEventListener('blur', onBlur);
  };
}

/** Returns tabbable elements within a container. */
export function getTabbableElements(container: HTMLElement): HTMLElement[] {
  const selector =
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  return Array.from(container.querySelectorAll<HTMLElement>(selector)).filter(
    (el) => el.offsetParent !== null || el === document.activeElement
  );
}

/** Trap focus within container while active; returns deactivate function. */
export function trapFocus(container: HTMLElement): () => void {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'Tab') return;
    const tabbables = getTabbableElements(container);
    if (tabbables.length === 0) return;

    const first = tabbables[0];
    const last = tabbables[tabbables.length - 1];
    const active = document.activeElement as HTMLElement | null;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  };

  container.addEventListener('keydown', handleKeyDown);
  return () => container.removeEventListener('keydown', handleKeyDown);
}

/** Move focus to the first tabbable element within a container. */
export function focusFirstTabbable(container: HTMLElement): void {
  const selector =
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  const target = container.querySelector<HTMLElement>(selector);
  target?.focus();
}

/** Handle roving tabindex for a list of items (arrow keys). */
export function handleRovingTabIndex(
  items: HTMLElement[],
  index: number,
  key: string
): number {
  if (items.length === 0) return index;

  let next = index;
  switch (key) {
    case 'ArrowDown':
    case 'ArrowRight':
      next = (index + 1) % items.length;
      break;
    case 'ArrowUp':
    case 'ArrowLeft':
      next = (index - 1 + items.length) % items.length;
      break;
    case 'Home':
      next = 0;
      break;
    case 'End':
      next = items.length - 1;
      break;
    default:
      return index;
  }

  items.forEach((item, i) => {
    item.tabIndex = i === next ? 0 : -1;
  });
  items[next]?.focus();
  return next;
}
