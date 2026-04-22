import { Module } from '@nestjs/common';
import { SessionsController } from './sessions.controller';
import { SessionsService } from './sessions.service';
import { HttpClient } from '../http-client/http-client';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [],
  controllers: [
    SessionsController
  ],
  providers: [
    SessionsService,
    {
      provide: 'SESSIONS_HTTP_CLIENT',
      useFactory: (configService: ConfigService) => new HttpClient(configService.get<string>('SESSIONS_MS_URI') ?? '', 'Microsserviço de sessões'),
      inject: [ConfigService]
    }
  ]
})
export class SessionsModule { }