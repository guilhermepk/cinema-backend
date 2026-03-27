import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SessionEntity } from "./models/entities/session.entity";
import { Repository } from "typeorm";
import { ISessionsRepository } from "./models/interfaces/sessions-repository.interface";

@Injectable()
export class SessionsTypeOrmRepository implements ISessionsRepository {
  constructor(
    @InjectRepository(SessionEntity)
    private readonly repository: Repository<SessionEntity>
  ) { }

  async create(session: SessionEntity): Promise<SessionEntity> {
    return await this.repository.save(session);
  }
}