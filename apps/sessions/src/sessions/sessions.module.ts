import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SessionEntity } from "./models/entities/session.entity";
import { CreateSessionController } from "./use-cases/create/create-session.controller";
import { CreateSessionUseCase } from "./use-cases/create/create-session.use-case";
import { SessionsTypeOrmRepository } from "./sessions.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([SessionEntity])
  ],
  controllers: [
    CreateSessionController
  ],
  providers: [
    CreateSessionUseCase,
    { provide: 'SessionsRepository', useClass: SessionsTypeOrmRepository }
  ]
})
export class SessionsModule { }