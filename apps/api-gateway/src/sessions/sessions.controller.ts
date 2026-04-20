import { Body, Controller, Post } from "@nestjs/common";
import { CreateSessionDto } from "./models/dtos/create-session.dto";
import { SessionsService } from "./sessions.service";
import { CreateSessionResponse } from "@cinema-backend/shared";

@Controller('sessions')
export class SessionsController {
  constructor(
    private readonly sessionsService: SessionsService
  ) { }

  @Post()
  async createSession(
    @Body() body: CreateSessionDto
  ): Promise<CreateSessionResponse> {
    return await this.sessionsService.createSession(body);
  }
}