export type AriaProps = {
  label?: string;
  labelledby?: string;
  describedby?: string;
};

export type ModalParameters = {
  onRequestClose?: () => void;
};

export type ModalConfig = {
  id: string;
  container: HTMLDivElement;
  content: HTMLDivElement;
  previousFocus: Element;
  parameters: ModalParameters;
  isStale: boolean;
};

export type PortalState = {
  portal: HTMLDivElement;
  guards: [HTMLDivElement, HTMLDivElement];
  modals: ModalConfig[];
};
