import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { validationSchema } from './config/validation.schema';
import { join } from 'path';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { AccessesModule } from './accesses/accesses.module';
import { AuthModule } from './auth/auth.module';
import { StoreCategoryModule } from './store-category/store-category.module'

const runningInDocker = process.env.RUNNING_IN_DOCKER === 'true';
const externalEnvPath = join(__dirname, '../../', '.env');
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: validationSchema,
      ignoreEnvFile: runningInDocker,
      envFilePath: runningInDocker ? undefined : externalEnvPath,
    }),
    DatabaseModule,
    RolesModule,
    UsersModule,
    AccessesModule,
    AuthModule,
    StoreCategoryModule,
  ],
controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
