// Implementation adapted from the React Modal library (itself adapted from jQuery UI core)
// https://github.com/reactjs/react-modal/blob/master/src/helpers/tabbable.js

export function getTabbableElements(node: HTMLElement | ShadowRoot) {
  // Find all tabbable element, including those in shadow roots.
  const elements = Array.from(node.querySelectorAll("*")).reduce((acc, el) => {
    return acc.concat(
      el.shadowRoot ? getTabbableElements(el.shadowRoot) : [el]
    );
  }, []);

  return elements.filter(isTabbable);
}

function isTabbable(element: HTMLElement) {
  const tabIndex = element.tabIndex;
  const tabIndexNaN = isNaN(tabIndex);

  return (tabIndexNaN || tabIndex >= 0) && isFocusable(element, tabIndexNaN);
}

function isFocusable(element: HTMLElement, tabIndexGiven: boolean) {
  const nodeName = element.nodeName.toLowerCase();

  const canBeDisabled = /input|select|textarea|button|object|iframe/.test(
    nodeName
  );

  if (canBeDisabled && !(element as HTMLButtonElement).disabled) {
    return isVisible(element);
  }

  const hasValidHref =
    nodeName === "a" && !!(element as HTMLAnchorElement).href;

  if (hasValidHref || tabIndexGiven) return isVisible(element);

  return false;
}

function isVisible(element: HTMLElement) {
  let parentElement: HTMLElement = element;

  let rootNode = element.getRootNode && element.getRootNode();

  while (parentElement) {
    if (parentElement == document.body) break;

    if (
      rootNode &&
      parentElement === rootNode &&
      rootNode instanceof ShadowRoot
    ) {
      parentElement = rootNode.host.parentNode as HTMLElement;
    }

    if (hidesContents(parentElement)) return false;

    parentElement = parentElement.parentNode as HTMLElement;
  }

  return true;
}

function hidesContents(element: HTMLElement) {
  const isZeroSize = element.offsetHeight <= 0 && element.offsetWidth <= 0;

  if (isZeroSize && !element.innerHTML) return true;

  try {
    const style = window.getComputedStyle(element);

    if (style.getPropertyValue("display") === "none") return true;

    const hasVisibleOverflow =
      isZeroSize &&
      style.getPropertyValue("overflow") === "visible" &&
      (element.scrollWidth >= 0 || element.scrollHeight >= 0);

    if (hasVisibleOverflow) return false;
  } catch (e) {
    console.warn("Failed to inspect element style");
    return false;
  }

  return false;
}