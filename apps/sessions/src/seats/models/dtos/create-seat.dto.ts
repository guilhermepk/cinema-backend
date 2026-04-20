import { EntityManager } from "typeorm";
import { SessionEntity } from "../../../sessions/models/entities/session.entity";

export class CreateSeatDto {
  session!: string | SessionEntity

  code!: string;

  transactionManager?: EntityManager
}