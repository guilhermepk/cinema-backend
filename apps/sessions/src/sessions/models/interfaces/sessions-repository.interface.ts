import { SessionEntity } from "../entities/session.entity";

export interface ISessionsRepository {
  create(session: SessionEntity): Promise<SessionEntity>;
}