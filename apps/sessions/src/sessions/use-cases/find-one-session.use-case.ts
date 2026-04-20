import { HttpException, Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { SessionEntity } from "../models/entities/session.entity";
import type { ISessionsRepository } from "../models/interfaces/sessions-repository.interface";

@Injectable()
export class FindOneSessionUseCase {
  constructor(
    @Inject('SessionsRepository')
    private readonly repository: ISessionsRepository
  ) { }

  async execute(id: string): Promise<SessionEntity> {
    try {
      const foundSession: SessionEntity | null = await this.repository.findOne(id);

      if (!foundSession) throw new NotFoundException(`Nenhuma sessão com o ID ${id} encontrada`);

      return foundSession;
    } catch (error: unknown) {
      if (error instanceof HttpException) throw error;
      else throw new InternalServerErrorException(`Não foi possível buscar sessão de ID ${id}`);
    }
  }
}