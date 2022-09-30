import { getActiveElement } from "./helpers/getActiveElement";
import { getTabbableElements } from "./helpers/getTabbableElements";
import { hideRootElement, showRootElement } from "./helpers/hideElements";
import { setupContainerListeners } from "./portalListeners";
import { setupPortal, teardownPortal } from "./setupPortal";
import type { ModalConfig, ModalParameters, PortalState } from "./types";

let portalState: PortalState;

export function mountContent(node, parameters: ModalParameters) {
  if (!portalState) portalState = setupPortal();

  const modalConfig = createModalConfig(node, parameters);

  portalState.modals.push(modalConfig);

  updatePortal(portalState);
  focusOnModal(modalConfig);

  return () => unmountContent(modalConfig);
}

function unmountContent(modalConfig: ModalConfig) {
  if (!portalState) return;

  modalConfig.isStale = true;

  // Determine if the modal is the topmost one. We'll want to return focus
  // to where it was before the element opened, if so.
  const isLast =
    modalConfig === portalState.modals[portalState.modals.length - 1];

  portalState.modals = portalState.modals.filter((m) => m !== modalConfig);

  // Update the portal - retaining the current focus if we're not removing
  // the topmost element.
  portalState = updatePortal(portalState, !isLast);

  if (isLast) returnFocus(modalConfig);
}

export function handleGuardFocus(event, position: "first" | "last") {
  // If focus has moved outside of the portal (for example, after tabbing
  // away from the page), move it back into the portal as soon as one
  // of the guards (tabbable divs set as the first and last children of the body)
  // receives focus.
  if (!portalState || !portalState.modals.length) return;

  event.preventDefault();

  const topModal = portalState.modals[portalState.modals.length - 1];

  const tabbables = getTabbableElements(topModal.content);
  if (position == "first") {
    return tabbables[0].focus();
  }

  return tabbables[tabbables.length - 1].focus();
}

function createModalConfig(node: any, parameters: ModalParameters) {
  const config: ModalConfig = {
    container: document.createElement("div"),
    content: node,

    isStale: false,

    id: Math.random().toString().slice(3, 13),
    previousFocus: getActiveElement(),
    parameters,
  };

  setupContainerListeners(config);
  config.container.appendChild(config.content);

  config.container.classList.add("modal-container");

  return config;
}

function updatePortal(portalState: PortalState, retainFocus?: boolean) {
  const { modals, portal } = portalState;

  let activeElement = getActiveElement();

  // If there are no modals left, we can unmount the entire
  // portal.
  if (modals.length === 0) {
    // Remove portal element
    teardownPortal(portalState);

    // Remove aria-hidden from root element
    showRootElement();

    return undefined;
  }

  // Ensure the root element has aria-hidden.
  hideRootElement();

  // Ensure all but the last (top) container has aria-hidden.
  modals.forEach((config) => {
    if (config !== modals[modals.length - 1]) {
      return config.container.setAttribute("aria-hidden", "true");
    }

    // Topmost modal should not be hidden.
    config.container.removeAttribute("aria-hidden");
  });

  // Replace portal contents with the tracked containers.
  portal.replaceChildren(...modals.map((m) => m.container));

  // Restore focus if requested.
  if (retainFocus) activeElement.focus();

  return portalState;
}

function focusOnModal(config: ModalConfig) {
  const tabbableElements = getTabbableElements(config.content);
  if (!tabbableElements.length) {
    return config.content.focus();
  }
  tabbableElements[0].focus();
}

function returnFocus(config: ModalConfig) {
  const target = config.previousFocus;

  if (document.body.contains(target) && target instanceof HTMLElement) {
    target.focus();
  }
}

export function requestModalClose(config: ModalConfig) {
  config.parameters.onRequestClose && config.parameters.onRequestClose();
}
