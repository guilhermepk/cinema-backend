import { Body, Controller, Post } from "@nestjs/common";
import { SharedCreateSessionDto, CreateSessionResponse } from '@cinema-backend/shared';
import { CreateSessionUseCase } from "./use-cases/create-session.use-case";

@Controller('sessions')
export class SessionsController {
  constructor(
    private readonly createSessionUseCase: CreateSessionUseCase
  ) { }

  @Post()
  async handle(
    @Body() data: SharedCreateSessionDto
  ): Promise<CreateSessionResponse> {
    return await this.createSessionUseCase.execute(data);
  }
}