/**
 * Stores for app-level controls, such as sidebar expansion
 */

import { writable } from "svelte/store";

/**
 * Sidebar
 */

export const sidebarExpanded = writable(false);

export function expandSidebar() {
  sidebarExpanded.set(true);
}

export function minimizeSidebar() {
  sidebarExpanded.set(false);
}

/**
 * Color Scheme
 */

export const colorScheme = writable<"light" | "dark">("light");

export function setColorSchemeLight() {
  colorScheme.set("light");
}

export function setColorSchemeDark() {
  colorScheme.set("dark");
}
