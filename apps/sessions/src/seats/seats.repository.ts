import { Injectable } from "@nestjs/common";
import { EntityManager, Repository } from "typeorm";
import { SeatEntity } from "./models/entities/seat.entity";
import { ISeatsRepository } from "./models/interfaces/seats-repository.interface";

@Injectable()
export class SeatsTypeOrmRepository implements ISeatsRepository {
  constructor(
    private readonly repository: Repository<SeatEntity>
  ) { }

  async create(seat: SeatEntity, transactionManager?: EntityManager): Promise<SeatEntity> {
    if (transactionManager) return transactionManager.save(seat);
    else return await this.repository.save(seat);
  }
}