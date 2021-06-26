/* eslint-disable import/no-cycle */
import { Entity, Column as TypeORMColumn, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Column from '../columns/column.model'; 
import Task from '../tasks/task.model';
import { IBoard } from '../../types';

@Entity()
class Board implements IBoard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @TypeORMColumn({
    length: 50,
    default: 'New board'
  })
  title: string;

  @OneToMany(() => Column, column => column.board)
  columns: Column[] | undefined;

  @OneToMany(() => Task, task => task.board, { onUpdate: 'CASCADE', cascade: ['update', 'insert'] })
  tasks: Task[];
}

export default Board;
