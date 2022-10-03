import { onDestroy } from "svelte";

import type { EventCallback, Events, EventTypes } from "../types/events";

export class EventBus {
  private listeners = new Map<string, Set<EventCallback<Events>>>();

  /**
   * Subscribe to the given event within a Svelte component.
   * The listener will automatically unsubscribe when the component is
   * descroyed.
   * @param eventName 
   * @param callback 
   */
  on<E extends Events>(eventName: E, callback: EventCallback<E>) {
    const unsubscribe = this.subscribe(eventName, callback);
    onDestroy(unsubscribe);
  }

  /**
   * Subscribe to the given event. Returns an unsubscribe function to remove
   * the listener.
   * @param eventName 
   * @param callback 
   * @returns 
   */
  subscribe<E extends Events>(eventName: E, callback: EventCallback<E>) {
    const unsubscribe = this.addListener(eventName, callback);
    return unsubscribe;
  }

  /**
   * Send an event to the event bus, optionally with a data payload.
   * @param eventName 
   * @param data 
   * @returns 
   */
  dispatch<E extends Events>(eventName: E, data?: EventTypes[E]) {
    let listenerSet = this.listeners.get(eventName);
    if (!listenerSet) return;

    for (const cb of listenerSet) {
      cb(data);
    }
  }

  private addListener<E extends Events>(
    eventName: E,
    callback: EventCallback<E>
  ) {
    let listenerSet = this.listeners.get(eventName);
    if (!listenerSet) {
      listenerSet = new Set();
      this.listeners.set(eventName, listenerSet);
    }
    listenerSet.add(callback);

    return () => listenerSet.delete(callback);
  }
}

export const eventBus = new EventBus();
