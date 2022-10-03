export interface StateMachineState {
  name: string;

  onEnter?: (data?: any) => void;
  onExit?: () => void;
  [id: string]: any;
}