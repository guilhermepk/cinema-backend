import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SessionsController } from './sessions.controller';
import { SessionsService } from './sessions.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SESSIONS_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'sessions',
            brokers: (process.env.KAFKA_BROKERS ?? 'localhost:9092').split(', ')
          },
          consumer: {
            groupId: 'sessions-consumer'
          }
        }
      }
    ])
  ],
  controllers: [
    SessionsController
  ],
  providers: [
    SessionsService
  ]
})
export class SessionsModule { }