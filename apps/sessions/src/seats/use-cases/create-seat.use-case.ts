import { HttpException, Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import type { ISeatsRepository } from "../models/interfaces/seats-repository.interface";
import { CreateSeatDto } from "../models/dtos/create-seat.dto";
import { SeatEntity } from "../models/entities/seat.entity";
import { SessionEntity } from "../../sessions/models/entities/session.entity";
import { FindOneSessionUseCase } from "../../sessions/use-cases/find-one-session.use-case";

@Injectable()
export class CreateSeatUseCase {
  constructor(
    @Inject('SeatsRepository')
    private readonly repository: ISeatsRepository,

    private readonly findOneSessionUseCase: FindOneSessionUseCase
  ) { }

  async execute(data: CreateSeatDto) {
    try {
      const session: SessionEntity = await this.handleSession(data.session);

      const seat = new SeatEntity({
        code: data.code,
        reserved: false,
        session
      });

      return await this.repository.create(seat, data.transactionManager);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      else throw new InternalServerErrorException(`Não foi possível criar o assento. ${error}`);
    }
  }

  private async handleSession(session: string | SessionEntity): Promise<SessionEntity> {
    if (session instanceof SessionEntity) return session;
    else {
      const foundSession = await this.findOneSessionUseCase.execute(session);
      return foundSession;
    }
  }
}