export interface IColumn {
  id: string;
  title: string;
  order: number;
}

export interface IBoard {
  id: string;
  title: string;
  columns?: IColumn[];
}

export interface ITask {
  id: string;
  title: string;
  order: number;
  description: string;
}

export interface IUser {
  id?: string;
  name: string;
  login: string;
  password: string;
}

export enum LogType {
  REQUEST = 'REQUEST',
  ERROR = 'ERROR'
}