import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SessionEntity } from "./models/entities/session.entity";
import { CreateSessionUseCase } from "./use-cases/create-session.use-case";
import { SessionsTypeOrmRepository } from "./sessions.repository";
import { SessionsController } from "./sessions.controller";
import { FindOneSessionUseCase } from "./use-cases/find-one-session.use-case";
import { SeatsModule } from "../seats/seats.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([SessionEntity]),
    forwardRef(() => SeatsModule)
  ],
  controllers: [
    SessionsController
  ],
  providers: [
    CreateSessionUseCase,
    { provide: 'SessionsRepository', useClass: SessionsTypeOrmRepository },
    FindOneSessionUseCase
  ],
  exports: [
    FindOneSessionUseCase
  ]
})
export class SessionsModule { }