import { EntityManager } from "typeorm";
import { SessionEntity } from "../entities/session.entity";

export interface ISessionsRepository {
  create(session: SessionEntity, transactionManager?: EntityManager): Promise<SessionEntity>;
  findOne(id: string): Promise<SessionEntity | null>;
}