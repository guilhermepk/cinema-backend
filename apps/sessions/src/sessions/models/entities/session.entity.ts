import { Column, Entity, PrimaryColumn } from "typeorm";
import { randomUUID } from "crypto";

@Entity('sessions')
export class SessionEntity {
  @PrimaryColumn('uuid')
  id: string = randomUUID();

  @Column()
  movie: string = '';

  @Column({ type: 'timestamptz' })
  showtime: Date = new Date();

  @Column()
  room: string = '';

  constructor(data: Omit<SessionEntity, 'id'>) {
    Object.assign(this, data);
  }
}