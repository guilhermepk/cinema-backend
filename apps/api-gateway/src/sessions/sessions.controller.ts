import { Body, Controller, Inject, OnModuleInit, Post } from "@nestjs/common";
import { CreateSessionDto } from "./models/dtos/create-session.dto";
import { ClientKafka } from "@nestjs/microservices";
import { SessionsService } from "./sessions.service";
import { SuccessResponse } from "@cinema-backend/shared";

@Controller('sessions')
export class SessionsController implements OnModuleInit {
  constructor(
    @Inject('SESSIONS_SERVICE')
    private readonly sessionsClient: ClientKafka,

    private readonly sessionsService: SessionsService
  ) { }

  onModuleInit() {
    this.sessionsClient.subscribeToResponseOf('sessions.create');
  }

  @Post()
  async createSession(
    @Body() body: CreateSessionDto
  ): Promise<SuccessResponse> {
    return await this.sessionsService.createSession(body);
  }
}