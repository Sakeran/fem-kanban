import { updateCurrentBoard } from "../../../stores/boardData";
import { eventBus } from "../../../lib/eventBus";
import { stateMachine } from "../stateMachine";
import type { StateMachineState } from "../types";

export const ViewCurrentBoardState: StateMachineState = {
  name: "viewCurrentBoard",

  onEnter() {
    updateCurrentBoard();

    this.onViewTaskUnsub = eventBus.subscribe("viewTask", (task) => {
      stateMachine.transition("viewTask", task);
    });
  },

  onExit() {
    this.onViewTaskUnsub();
  },
};
