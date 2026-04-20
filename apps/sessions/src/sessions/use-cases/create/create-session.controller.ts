import { Body, Controller, Post } from "@nestjs/common";
import { CreateSessionRequest, CreateSessionResponse } from '@cinema-backend/shared';
import { CreateSessionUseCase } from "./create-session.use-case";

@Controller('sessions')
export class CreateSessionController {
  constructor(
    private readonly createSessionUseCase: CreateSessionUseCase
  ) { }

  @Post()
  async handle(
    @Body() data: CreateSessionRequest
  ): Promise<CreateSessionResponse> {
    return await this.createSessionUseCase.execute(data);
  }
}