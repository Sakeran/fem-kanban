import { getContext, setContext } from "svelte";
import { readable, type Readable } from "svelte/store";

import type { AppState } from "src/types/appState";

export const appStateKey = "app-state-key";

export function createAppStateContext(initialState: AppState) {
  const store = readable<AppState>(initialState);

  setContext(appStateKey, store);
}

export function getAppState() {
  const store =
  getContext<Readable<AppState>>(appStateKey)
  if (!store) throw new Error("Could not get AppState from context.");

  return store;
}
