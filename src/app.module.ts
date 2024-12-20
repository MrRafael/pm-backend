import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/roles.guard';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ClientsModule } from './clients/clients.module';
import { FileCategoryModule } from './file-category/file-category.module';
import { ProposalTemplateModule } from './proposal-template/proposal-template.module';
import { ProjectModule } from './project/project.module';
import { PaymentInstallmentsModule } from './payment-installments/payment-installments.module';
import { ProjectFilesModule } from './project-files/project-files.module';
import { ProjectNoteModule } from './project-note/project-note.module';
import { CustomFieldModule } from './custom-field/custom-field.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: { expiresIn: configService.get<string>('jwt.duration') },
      }),
      inject: [ConfigService],
      global: true,
    }),
    ClientsModule,
    FileCategoryModule,
    ProposalTemplateModule,
    ProjectModule,
    PaymentInstallmentsModule,
    ProjectFilesModule,
    ProjectNoteModule,
    CustomFieldModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
