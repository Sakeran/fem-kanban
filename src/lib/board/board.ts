import type { BoardColumnData } from "./boardColumn";
import BoardColumn from "./boardColumn";

export type BoardData = {
  id: string;
  name: string;
  columns: BoardColumnData[];
};


export default class Board {
  readonly id;
  readonly name;

  public columns: BoardColumn[];

  constructor(boardData: BoardData) {
    this.id = boardData.id;
    this.name = boardData.name;

    this.columns = boardData.columns.map((cd) => new BoardColumn(cd, this));
  }

  serializeToData() {
    return {
      id: this.id,
      name: this.name,
      columns: this.columns.map((c) => c.serializeToData),
    };
  }
}
