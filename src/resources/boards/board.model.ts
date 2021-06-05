import { v4 as uuid } from 'uuid';

import { IBoard, Column } from '../../types';

class Board implements IBoard {
  id: string;

  title: string;

  columns: Array<Column>;

  constructor({ id = uuid(), title = 'New board', columns = [] }: IBoard = {} as IBoard) {
    this.id = id;
    this.title = title;
    this.columns = columns.map((column) => ({ id: uuid(), ...column }));
  }
}

export default Board;
