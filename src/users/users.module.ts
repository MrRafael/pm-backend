import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { userProviders } from './users.providers';
import { DatabaseModule } from 'src/database/database.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    DatabaseModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          service: configService.get<string>('email.service'),
          auth: {
            user: configService.get<string>('email.email'),
            pass: configService.get<string>('email.password'),
          },
          // host: process.env.EMAIL_HOST,
        },
      }),
    }),
  ],
  controllers: [UsersController],
  providers: [...userProviders, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
