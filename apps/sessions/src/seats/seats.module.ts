import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SeatEntity } from "./models/entities/seat.entity";
import { CreateSeatUseCase } from "./use-cases/create-seat.use-case";
import { SeatsTypeOrmRepository } from "./seats.repository";
import { SessionsModule } from "../sessions/sessions.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([SeatEntity]),
    forwardRef(() => SessionsModule)
  ],
  providers: [
    { provide: 'SeatsRepository', useClass: SeatsTypeOrmRepository },
    CreateSeatUseCase
  ],
  exports: [
    CreateSeatUseCase
  ]
})
export class SeatsModule { }