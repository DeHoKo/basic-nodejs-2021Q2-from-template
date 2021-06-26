/* eslint-disable import/no-cycle */
import { Entity, Column as TypeORMColumn, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import User from '../users/user.model';
import Column from '../columns/column.model';
import Board from '../boards/board.model';

import { ITask } from '../../types';

@Entity()
class Task implements ITask {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @TypeORMColumn({
    length: 50,
    default: 'New task'
  })
  title: string;

  @TypeORMColumn()
  order: number;

  @TypeORMColumn({
    type: 'text',
    default: 'A new task'
  })
  description: string;

  @TypeORMColumn({ nullable: true })
  userId: string;

  @TypeORMColumn({ nullable: true })
  boardId: string;

  @TypeORMColumn({ nullable: true })
  columnId: string;

  @ManyToOne(() => User, user => user.id, { onUpdate: 'CASCADE' })
  user: User;

  @ManyToOne(() => Board, board => board.id, { cascade: true, onDelete: 'CASCADE' })
  board: Board;

  @ManyToOne(() => Column, column => column.id, { cascade: true })
  column: Column;
}

export default Task;
