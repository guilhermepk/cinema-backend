import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SessionEntity } from "./models/entities/session.entity";
import { EntityManager, Repository } from "typeorm";
import { ISessionsRepository } from "./models/interfaces/sessions-repository.interface";

@Injectable()
export class SessionsTypeOrmRepository implements ISessionsRepository {
  constructor(
    @InjectRepository(SessionEntity)
    private readonly repository: Repository<SessionEntity>
  ) { }

  async create(session: SessionEntity, transactionManager?: EntityManager): Promise<SessionEntity> {
    if (transactionManager) return transactionManager.save(session);
    else return await this.repository.save(session);
  }

  async findOne(id: string): Promise<SessionEntity | null> {
    return await this.repository.findOne({ where: { id } });
  }
}