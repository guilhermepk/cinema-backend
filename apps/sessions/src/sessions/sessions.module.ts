import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SessionEntity } from "./models/entities/session.entity";
import { CreateSessionUseCase } from "./use-cases/create-session.use-case";
import { SessionsTypeOrmRepository } from "./sessions.repository";
import { SessionsController } from "./sessions.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([SessionEntity])
  ],
  controllers: [
    SessionsController
  ],
  providers: [
    CreateSessionUseCase,
    { provide: 'SessionsRepository', useClass: SessionsTypeOrmRepository }
  ]
})
export class SessionsModule { }