export type Column = {
  title: string;
  order: number;
}

export interface IBoard {
  id: string;
  title: string;
  columns: Array<Column>;
}

export interface ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string;
  columnId: string;
}

export interface IUser {
  id: string;
  name: string;
  login: string;
  password: string;
}