import { eventBus } from "../lib/eventBus";
import { writable } from "svelte/store";

export const currentState = writable<string>(undefined);

eventBus.subscribe("stateTransition", (newState) => currentState.set(newState));
