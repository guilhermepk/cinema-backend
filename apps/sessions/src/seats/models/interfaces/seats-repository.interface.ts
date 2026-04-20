import { EntityManager } from "typeorm";
import { SeatEntity } from "../entities/seat.entity";

export interface ISeatsRepository {
  create(seat: SeatEntity, transactionManager?: EntityManager): Promise<SeatEntity>;
}