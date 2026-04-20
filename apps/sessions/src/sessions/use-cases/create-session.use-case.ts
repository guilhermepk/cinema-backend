import { CreateSessionDto, CreateSessionResponse } from "@cinema-backend/shared";
import { HttpException, Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import type { ISessionsRepository } from "../models/interfaces/sessions-repository.interface";
import { SessionEntity } from "../models/entities/session.entity";

@Injectable()
export class CreateSessionUseCase {
  constructor(
    @Inject('SessionsRepository')
    private readonly repository: ISessionsRepository
  ) { }

  async execute(data: CreateSessionDto): Promise<CreateSessionResponse> {
    try {
      const date = new Date(data.datetime);

      const session = new SessionEntity({
        movie: data.movie,
        datetime: date,
        room: data.room
      });

      const savedSession = await this.repository.create(session);

      return {
        ...savedSession,
        datetime: savedSession.datetime.toISOString()
      };
    } catch (error: any) {
      if (error instanceof HttpException) throw error;
      else throw new InternalServerErrorException(`Não foi possível criar a sessão. ${error}`);
    }
  }
}