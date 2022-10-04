import { eventBus } from "../../../lib/eventBus";
import type { StateMachineState } from "../types";
import { stateMachine } from "../stateMachine";
import { addBoard, setCurrentBoardId } from "../../../stores/boardData";

export const AddNewBoardState: StateMachineState = {
  name: "addNewBoard",

  onEnter() {
    this.cancelUnsub = eventBus.subscribe("addNewBoardCancel", () => {
      stateMachine.transition("viewCurrentBoard");
    });

    this.createUnsub = eventBus.subscribe("addNewBoardCreate", (boardData) => {
      const newBoard = addBoard(boardData.name, boardData.columns);
      setCurrentBoardId(newBoard.id);

      stateMachine.transition("viewCurrentBoard");
    });
  },

  onExit() {
    this.cancelUnsub();
    this.createUnsub();
  },
};
