export function on(
  element: Element | Window,
  eventName: keyof DocumentEventMap,
  callback: () => void,
  options?: Record<string, unknown>
) {
  const opts = options || false;
  element.addEventListener(eventName, callback, opts);
}

export function off(
  element: Element | Window,
  eventName: keyof DocumentEventMap,
  callback: () => void,
  options?: Record<string, unknown>
) {
  const opts = options || false;
  element.removeEventListener(eventName, callback, opts);
}
