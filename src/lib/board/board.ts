import type { BoardColumnData } from "./boardColumn";
import BoardColumn from "./boardColumn";

export type BoardData = {
  id: string;
  name: string;
  columns: BoardColumnData[];
};

export default class Board {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly columns: BoardColumn[]
  ) {}

  static createFromData(data: BoardData) {
    return new Board(
      data.id,
      data.name,
      data.columns.map((cd) => BoardColumn.createFromData(cd))
    );
  }

  serializeToData() {
    return {
      id: this.id,
      name: this.name,
      columns: this.columns.map((c) => c.serializeToData),
    };
  }
}
