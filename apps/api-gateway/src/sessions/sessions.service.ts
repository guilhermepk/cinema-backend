import { CreateSessionResponse } from "@cinema-backend/shared";
import { HttpException, Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { HttpClient } from "../http-client/http-client";
import { CreateSessionDto } from "./models/dtos/create-session.dto";

@Injectable()
export class SessionsService {
  constructor(
    @Inject('SESSIONS_HTTP_CLIENT')
    private readonly sessionsHttpClient: HttpClient
  ) { }

  async createSession(data: CreateSessionDto): Promise<CreateSessionResponse> {
    try {
      const response = await this.sessionsHttpClient.post<CreateSessionResponse, CreateSessionDto>(
        '/sessions',
        data
      );

      return response;
    } catch (error: any) {
      if (error instanceof HttpException) throw error;
      else throw new InternalServerErrorException(`Não foi possível cadastrar a sessão. ${error}`);
    }
  }
}