import { CreateSessionRequest, CreateSessionResponse, SuccessResponse } from "@cinema-backend/shared";
import { HttpException, Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

@Injectable()
export class SessionsService {
  constructor(
    @Inject('SESSIONS_SERVICE')
    private readonly sessionsClient: ClientKafka
  ) { }

  async createSession(data: CreateSessionRequest): Promise<SuccessResponse> {
    try {
      const request = new CreateSessionRequest(data.movie, data.showtime, data.room);

      await firstValueFrom(
        this.sessionsClient.send<CreateSessionResponse>('sessions.create', request)
      );

      return new SuccessResponse(true);
    } catch (error: any) {
      if (error.statusCode) throw new HttpException(error.message, error.statusCode, { cause: error.cause });
      else throw new InternalServerErrorException('Error while creating session', { cause: error });
    }
  }
}