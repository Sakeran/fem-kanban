// Add aria-hidden to the root element
export function hideRootElement() {
  const root = document.getElementById("root");

  if (!root) throw new Error("Application missing #root element.");
  root.setAttribute("aria-hidden", "true");
}

// Remove aria-hidden from the root element
export function showRootElement() {
  const root = document.getElementById("root");

  if (!root) throw new Error("Application missing #root element.");
  root.removeAttribute("aria-hidden");
}
