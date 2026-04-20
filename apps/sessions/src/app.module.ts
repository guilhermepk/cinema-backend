import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/postgres.config';
import { SessionsModule } from './sessions/sessions.module';
import { SeatsModule } from './seats/seats.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      inject: [TypeOrmConfigService]
    }),
    SessionsModule,
    SeatsModule
  ],
})
export class AppModule { }
