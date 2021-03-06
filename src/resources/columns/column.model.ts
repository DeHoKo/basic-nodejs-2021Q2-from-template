/* eslint-disable import/no-cycle */
import { Entity, Column as TypeORMColumn, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import Board from '../boards/board.model';

import { IColumn } from '../../types';

@Entity()
class Column implements IColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @TypeORMColumn({
    length: 50
  })
  title: string;

  @TypeORMColumn()
  order: number;

  @TypeORMColumn({ nullable: true })
  boardId: string;

  @ManyToOne(() => Board, board => board.id, { cascade: true, onDelete: 'SET NULL', eager: true })
  board: Board;
}

export default Column;
