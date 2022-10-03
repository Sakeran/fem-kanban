import { eventBus } from "../eventBus";
import { AddNewBoardState } from "./states/addNewBoard";
import { AddNewTaskState } from "./states/addNewTask";
import { DeleteBoardState } from "./states/deleteBoard";
import { DeleteTaskState } from "./states/deleteTask";
import { EditBoardState } from "./states/editBoard";
import { EditTaskState } from "./states/editTask";
import { LoadingState } from "./states/loading";
import { ViewCurrentBoardState } from "./states/viewCurrentBoard";
import { ViewTaskState } from "./states/viewTask";
import type { StateMachineState } from "./types";

export class StateMachine {
  // Mapping of state names to definitions.
  states: Map<string, StateMachineState> = new Map();

  // Name of active state.
  activeState: string;

  /**
   * Add the given state to the state machine.
   * @param state
   */
  addState(state: StateMachineState) {
    if (this.states.has(state.name))
      throw new Error(
        `State "${state.name}" is already defined for StateMachine.`
      );
    this.states.set(state.name, state);
  }

  /**
   * Remove the given state from the state machine.
   * @param stateName
   */
  removeState(stateName: string) {
    if (!this.states.has(stateName)) return;

    this.states.delete(stateName);
  }

  /**
   * Start the state machine on the given state.
   */
  start(stateName: string) {
    if (!this.states.has(stateName))
      throw new Error(
        `Tried to start StateMachine with unknown state "${stateName}"`
      );

    this.transition(stateName);
  }

  /**
   *  Transition from current state into the state with the given name.
   * @param stateName
   */
  transition(stateName: string, data?: any) {
    if (!this.states.has(stateName))
      throw new Error(`Tried to transition into unknown state "${stateName}"`);

    const currentState = this.states.get(this.activeState);
    const newState = this.states.get(stateName) as StateMachineState;

    currentState && currentState.onExit && currentState.onExit();

    newState.onEnter && newState.onEnter(data);
    this.activeState = stateName;

    eventBus.dispatch("stateTransition", stateName);
  }
}

const singleton = new StateMachine();

singleton.addState(LoadingState);
singleton.addState(ViewCurrentBoardState);
singleton.addState(ViewTaskState);
singleton.addState(EditTaskState);
singleton.addState(DeleteTaskState);
singleton.addState(AddNewTaskState);
singleton.addState(EditBoardState);
singleton.addState(DeleteBoardState);
singleton.addState(AddNewBoardState);

export const stateMachine = singleton;
