import { getContext, onDestroy, setContext } from "svelte";

import type { EventCallback, Events, EventTypes } from "../types/events";

export class EventBus {
  private listeners = new Map<string, Set<EventCallback<Events>>>();

  on<E extends Events>(eventName: E, callback: EventCallback<E>) {
    let listenerSet = this.listeners.get(eventName);
    if (!listenerSet) {
      listenerSet = new Set();
      this.listeners.set(eventName, listenerSet);
    }
    listenerSet.add(callback);

    onDestroy(() => {
      listenerSet.delete(callback);
    });
  }

  dispatch<E extends Events>(eventName: E, data?: EventTypes[E]) {
    let listenerSet = this.listeners.get(eventName);
    if (!listenerSet) return;

    for (const cb of listenerSet) {
      cb(data);
    }
  }
}

export function createEventBusContext(key = "eventBus") {
  const bus = new EventBus();

  setContext(key, bus);
  return bus;
}

export function getEventBus(key = "eventBus") {
  const bus = getContext(key) as EventBus;
  if (!bus) throw new Error("Failed to get event bus from context");

  return bus;
}