import type { InputListAction } from "../../components/Interactive/InputList/InputList.svelte";
import generateId from "../../helpers/generateId";
import { eventBus } from "../eventBus";
import type { BoardColumnData } from "./boardColumn";
import { BoardColumn } from "./boardColumn";
import type { Task } from "./task";

export type BoardData = {
  id: string;
  name: string;
  columns: BoardColumnData[];
};

export class Board {
  public id: string;
  public name: string;
  public columns: BoardColumn[];

  get columnNames() {
    return this.columns.map((c) => c.name);
  }

  getColumn(columnName) {
    const column = this.columns.find((c) => c.name == columnName);

    if (!column) {
      throw new Error(
        `Board "${this.name}" has no column named "${columnName}"`
      );
    }

    return column;
  }

  static createNewBoard(name, columnNames: string[]) {
    const board = new Board();

    board.id = generateId();
    board.name = name;
    // TODO -- pick better board colors
    board.columns = columnNames.map((name) => {
      const column = BoardColumn.createNewColumn(name, "#a618cf");
      column.setBoard(board);
      return column;
    });

    return board;
  }

  static loadFromData(data: BoardData) {
    const board = new Board();

    board.id = data.id;
    board.name = data.name;
    board.columns = data.columns.map((cd) => {
      const column = BoardColumn.loadFromData(cd);
      column.setBoard(board);
      return column;
    });

    return board;
  }

  dispatchChangeEvent() {
    eventBus.dispatch("boardUpdated", this);
  }

  serializeToData(): BoardData {
    return {
      id: this.id,
      name: this.name,
      columns: this.columns.map((c) => c.serializeToData()),
    };
  }

  update(
    name: string,
    columnNames: string[],
    columnActions: InputListAction[]
  ) {
    this.updateName(name);
    this.updateColumnNames(columnNames, columnActions);

    this.dispatchChangeEvent();
  }

  updateName(name: string) {
    if (this.name !== name) {
      this.name = name;
    }
  }

  updateColumnNames(columnNames: string[], columnActions: InputListAction[]) {
    // To avoid losing data, we track the individual modifications made to the corresponding
    // input list, and mirror the sequence in place across our data.

    const deletedColumns = new Map<string, BoardColumn>();

    for (const action of columnActions) {
      if (action.type === "init") {
        // Records the state of the list before the user started modifying it.
        // No action necessary.
        continue;
      }

      if (action.type == "add") {
        // User hit 'add new'.
        // Append a new column to the end of our array.

        // TODO - pick better board colors
        const newColumn = BoardColumn.createNewColumn("", "#df8fd9");
        newColumn.setBoard(this);
        this.columns.push(newColumn);
        continue;
      }

      if (action.type === "delete") {
        // The user hit 'delete item'.
        // Remove the given column from our array.
        // (Keep a reference to it, in case the user is simply reordering the columns.)
        const column = this.columns[action.index];
        if (!column)
          throw new Error("Tried to delete column at an out-of-bounds index");

        deletedColumns.set(column.name.toLowerCase(), column);

        this.columns = this.columns.filter((c) => c !== column);
        continue;
      }

      if (action.type === "rename") {
        // The user updated one of the item fields.

        // If the column was renamed to match a previously-deleted column, replace
        // the column at this position with the deleted column. (Delete the previous one.)
        // Otherwise, simply update the column name.

        const column = this.columns[action.index];
        if (!column)
          throw new Error("Tried to rename column at an out-of-bounds index");

        if (deletedColumns.has(action.value.toLowerCase())) {
          const restoredColumn = deletedColumns.get(action.value.toLowerCase());
          deletedColumns.delete(action.value.toLowerCase());
          deletedColumns.set(column.name.toLowerCase(), column);

          this.columns[action.index] = restoredColumn;
        } else {
          column.name = action.value;
        }

        continue;
      }

      // TODO - Rather than discarding any tasks in deleted columns, it would be better
      // to place them somewhere recoverable, like an 'unsorted' column.
    }
  }

  setTaskColumn(task: Task, columnName: string) {
    const column = this.getColumn(columnName);
    column.addTask(task);

    this.dispatchChangeEvent();
  }

  updateTaskColumn(task: Task, columnName: string) {
    const oldColumn = task.column;
    const newColumn = this.getColumn(columnName);

    oldColumn.removeTask(task);
    newColumn.addTask(task);

    this.dispatchChangeEvent();
  }
}
