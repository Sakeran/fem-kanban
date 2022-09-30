import { handleGuardFocus } from "./portal";
import type { PortalState } from "./types";

export function setupPortal() {
  const portal = createPortalElement();
  const guards = createPortalGuards();

  const portalState: PortalState = {
    guards,
    portal,
    modals: [],
  };

  mountPortal(portalState);

  return portalState;
}

export function teardownPortal(portalState) {
  unmountPortal(portalState);
}

function createPortalElement() {
  // Clear existing DOM element, if it exists.
  const existing = document.getElementById("kanban-modal-portal");
  if (existing) document.removeChild(existing);

  const portal = document.createElement("div");
  portal.id = "kanban-modal-portal";

  return portal;
}

function createPortalGuards() {
  // Clear existing DOM elements, if they exist.
  const existingFirst = document.getElementById("kanban-modal-guard-first");
  const existingLast = document.getElementById("kanban-modal-guard-last");

  if (existingFirst) document.removeChild(existingFirst);
  if (existingLast) document.removeChild(existingLast);

  const first = document.createElement("div");
  const last = document.createElement("div");

  first.id = "kanban-modal-guard-first";
  last.id = "kanban-modal-guard-last";

  return [first, last] as PortalState["guards"];
}

function mountPortal(portalState: PortalState) {
  portalState.guards.forEach((guard) => {
    guard.tabIndex = 0;
    guard.removeEventListener("focus", (e) => handleGuardFocus(e, "first"));
    guard.addEventListener("focus", (e) => handleGuardFocus(e, "last"));
  });

  document.body.appendChild(portalState.portal);

  document.body.prepend(portalState.guards[0]);
  document.body.appendChild(portalState.guards[1]);

  // Apply backdrop effect after mounting to show animation in.
  setTimeout(() => {
    portalState.portal.classList.add("modal-scrim");
  }, 0);
}

function unmountPortal(portalState: PortalState) {
  portalState.guards.forEach((g) => g.remove());

  portalState.portal.remove();
}
