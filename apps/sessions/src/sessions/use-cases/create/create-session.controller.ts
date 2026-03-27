import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { CreateSessionRequest, CreateSessionResponse } from '@cinema-backend/shared';
import { CreateSessionUseCase } from "./create-session.use-case";

@Controller()
export class CreateSessionController {
  constructor(
    private readonly createSessionUseCase: CreateSessionUseCase
  ) { }

  @MessagePattern('sessions.create')
  async handle(
    @Payload() data: CreateSessionRequest
  ): Promise<CreateSessionResponse> {
    return await this.createSessionUseCase.execute(data);
  }
}