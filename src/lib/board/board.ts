import generateId from "../../helpers/generateId";
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
      const column = BoardColumn.createNewColumn(name, "red");
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

  serializeToData(): BoardData {
    return {
      id: this.id,
      name: this.name,
      columns: this.columns.map((c) => c.serializeToData()),
    };
  }

  update(name: string, columnNames: string[]) {
    this.updateName(name);
    this.updateColumnNames(columnNames);
  }

  updateName(name: string) {
    if (this.name !== name) {
      this.name = name;
    }
  }

  updateColumnNames(columnNames: string[]) {
    console.log("TODO: updateColumnNames");
  }

  setTaskColumn(task: Task, columnName: string) {
    const column = this.getColumn(columnName);
    column.addTask(task);
  }

  updateTaskColumn(task: Task, columnName: string) {
    const oldColumn = task.column;
    const newColumn = this.getColumn(columnName);

    oldColumn.removeTask(task);
    newColumn.addTask(task);
  }
}
