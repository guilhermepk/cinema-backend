import { CreateSessionRequest, CreateSessionResponse } from "@cinema-backend/shared";
import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import type { ISessionsRepository } from "../../models/interfaces/sessions-repository.interface";
import { SessionEntity } from "../../models/entities/session.entity";

@Injectable()
export class CreateSessionUseCase {
  constructor(
    @Inject('SessionsRepository')
    private readonly repository: ISessionsRepository
  ) { }

  async execute(data: CreateSessionRequest): Promise<CreateSessionResponse> {
    try {
      const date = new Date(data.showtime);

      console.log('date', date, date.toISOString(), date.toLocaleString())

      const session = new SessionEntity({
        movie: data.movie,
        showtime: date,
        room: data.room,
      });

      const savedSession = await this.repository.create(session);

      return {
        ...savedSession,
        showtime: savedSession.showtime.toISOString()
      };
    } catch (error: any) {
      throw new RpcException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || 'Falha na criação da sessão',
        cause: error.message ?? error
      });
    }
  }
}