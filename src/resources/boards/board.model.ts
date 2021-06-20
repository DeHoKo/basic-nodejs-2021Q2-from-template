import { Entity, Column as TypeORMColumn, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import Column from '../columns/column.model';

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

  @ManyToOne(() => Column, column => column.id, { cascade: true })
  column: Column;
}

export default Board;
