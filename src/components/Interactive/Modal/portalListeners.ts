import { getActiveElement } from "./helpers/getActiveElement";
import { getTabbableElements } from "./helpers/getTabbableElements";
import { requestModalClose } from "./portal";
import type { ModalConfig } from "./types";

export function setupContainerListeners(config: ModalConfig) {
  const container = config.container;

  container.addEventListener("click", (e) => handleClick(config, e));
  container.addEventListener("keydown", (e) => handleKeydown(config, e));
}

function handleKeydown(config: ModalConfig, event: KeyboardEvent) {
  const key = event.key;

  if (key === "Escape" && !config.isStale) {
    event.preventDefault();
    return requestModalClose(config);
  }

  if (key === "Tab") {
    return handleTab(config, event);
  }
}

function handleTab(config: ModalConfig, event: KeyboardEvent) {
  // Contain focus within the topmost modal.
  // Note: Most of this implementation borrowed from the react-modal package (v3.15.1)
  // https://github.com/reactjs/react-modal/blob/9bf0d4f7db7f6eaeb428b648e08d678791ed409b/src/helpers/scopeTab.js#L9

  const tabbable = getTabbableElements(config.content);

  if (!tabbable.length) {
    return event.preventDefault();
  }

  const contentNode = config.content;

  let target;

  const shiftKeyPressed = event.shiftKey;
  const activeElement = getActiveElement();
  const head = tabbable[0];
  const tail = tabbable[tabbable.length - 1];

  // Determine if we need to intervene in the tab order

  // Shift+Tab with focus on content node
  if (contentNode === activeElement) {
    if (!shiftKeyPressed) return;
    target = tail;
  }

  // Tab key on last element
  if (tail === activeElement && !shiftKeyPressed) {
    target = head;
  }

  // Shift+Tab on first element
  if (head === activeElement && shiftKeyPressed) {
    target = tail;
  }

  // If target was set, manually set focus.
  if (target) {
    event.preventDefault();
    return target.focus();
  }

  // If we didn't need to intervene, next check if the browser is Safari.
  const checkSafari = /(\bChrome\b|\bSafari\b)\//.exec(navigator.userAgent);
  const isSafariDesktop =
    checkSafari != null &&
    checkSafari[1] != "Chrome" &&
    /\biPod\b|\biPad\b/g.exec(navigator.userAgent) == null;

  // If the browser is not Safari, allow the browser to handle focus.
  if (!isSafariDesktop) return;

  // If the browser is Safari, manually walk through elements.
  let x = tabbable.indexOf(activeElement);

  // Pick the next/previous tabbable element, depending on whether
  // shift is pressed.
  if (x > -1) {
    x += shiftKeyPressed ? -1 : 1;
  }

  target = tabbable[x];

  // If we walked off either edge of the array, manually wrap.
  if (typeof target === "undefined") {
    target = shiftKeyPressed ? tail : head;
  }

  event.preventDefault();
  return target.focus();
}

function handleClick(config: ModalConfig, event: MouseEvent) {
  // Ignore if the config has already been removed from the portal.
  // (This can happen if some click inside the content triggered a removal)
  if (config.isStale) return;

  // If the click was not inside of the container's content,
  // treat it as a request to close the modal
  const target = event.target;
  if (!(target instanceof Element)) return;

  if (config.content.contains(target)) return;

  // If the target is no longer contained by the document, don't trigger a change.
  // (This can happen if some event handler deletes the target.)
  if (!document.contains(target)) {
    return;
  }

  event.preventDefault();
  return requestModalClose(config);
}
