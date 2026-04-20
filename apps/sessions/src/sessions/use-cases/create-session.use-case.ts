import { CreateSessionDto, CreateSessionResponse } from "@cinema-backend/shared";
import { HttpException, Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import type { ISessionsRepository } from "../models/interfaces/sessions-repository.interface";
import { SessionEntity } from "../models/entities/session.entity";
import { EntityManager } from "typeorm";
import { CreateSeatUseCase } from "../../seats/use-cases/create-seat.use-case";

@Injectable()
export class CreateSessionUseCase {
  constructor(
    @Inject('SessionsRepository')
    private readonly repository: ISessionsRepository,

    private readonly entityManager: EntityManager,

    private readonly createSeatUseCase: CreateSeatUseCase
  ) { }

  async execute(data: CreateSessionDto): Promise<CreateSessionResponse> {
    try {
      return await this.entityManager.transaction(async (transactionManager: EntityManager) => {
        const date = new Date(data.datetime);

        const session = new SessionEntity({
          movie: data.movie,
          datetime: date,
          room: data.room
        });

        const savedSession = await this.repository.create(session, transactionManager);

        for (const seat of data.seats) {
          await this.createSeatUseCase.execute({
            code: seat.code,
            session: savedSession,
            transactionManager
          });
        }

        return {
          ...savedSession,
          datetime: savedSession.datetime.toISOString()
        };
      });
    } catch (error: any) {
      if (error instanceof HttpException) throw error;
      else throw new InternalServerErrorException(`Não foi possível criar a sessão. ${error}`);
    }
  }
}