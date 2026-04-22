import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { randomUUID } from "crypto";
import { SeatEntity } from "../../../seats/models/entities/seat.entity";

@Entity('sessions')
export class SessionEntity {
  @PrimaryColumn('uuid')
  id: string = randomUUID();

  @Column()
  movie!: string;

  @Column({ type: 'timestamptz' })
  datetime!: Date;

  @Column()
  room!: string;

  // --- { RELATIONS } ---

  @OneToMany(() => SeatEntity, seat => seat.session)
  seats!: Array<SeatEntity>;

  // ---------------------

  constructor(data: Omit<SessionEntity, 'id' | 'seats'>) {
    Object.assign(this, data);
  }
}