import { Module } from '@nestjs/common';
import { SessionsModule } from './sessions/sessions.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    SessionsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
