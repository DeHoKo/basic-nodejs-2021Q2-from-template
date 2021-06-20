import { Entity, Column as TypeORMColumn, PrimaryGeneratedColumn } from 'typeorm';

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
}

export default Column;
