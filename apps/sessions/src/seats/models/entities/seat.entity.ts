import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { randomUUID } from "crypto";
import { SessionEntity } from "../../../sessions/models/entities/session.entity";

@Entity('seats')
export class SeatEntity {
  @PrimaryColumn('uuid')
  id: string = randomUUID();

  @Column()
  code!: string;

  @Column()
  reserved!: boolean;

  // --- { RELATIONS } ---

  @JoinColumn({ name: 'fk_session' })
  @ManyToOne(() => SessionEntity, session => session.seats, { nullable: false })
  session!: SessionEntity;

  // ---------------------

  constructor(data: Omit<SeatEntity, 'id'>) {
    Object.assign(this, data);
  }
}