export function getActiveElement(element: Document | ShadowRoot = document) {
  return element.activeElement.shadowRoot
    ? getActiveElement(element.activeElement.shadowRoot)
    : element.activeElement;
}
