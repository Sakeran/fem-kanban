/**
 * Mapping of event names to payloads
 */
export type EventTypes = {
  event1: boolean; // stub
  event2: string; // stub
};

export type Events = keyof EventTypes;

export type EventCallback<E extends Events> = (data?: EventTypes[E]) => void;
