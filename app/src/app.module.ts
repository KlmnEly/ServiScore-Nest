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
import { AdressesModule } from './adresses/adresses.module';
import { CountriesModule } from './countries/countries.module';
import { CitiesModule } from './cities/cities.module';
import { StoreCategoryModule } from './store-category/store-category.module'
import { StatusModule } from './status/status.module';
import { UserWorkerModule } from './user-worker/user-worker.module';
import { StoresModule } from './stores/stores.module';
import { ServiceHistoryModule } from './service-history/service-history.module';
import { WorkerReviewModule } from './worker-review/worker-review.module';
import { ServiceWorkerModule } from './service-worker/service-worker.module';

import { ServicesModule } from './services/services.module';
import { StoreReviewModule } from './store-review/store-review.module';
import { ServiceCategoryModule } from './service-category/service-category.module';

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
    AdressesModule,
    CountriesModule,
    CitiesModule,
    StoreCategoryModule,
    StatusModule,
    UserWorkerModule,
    StoresModule,
    ServiceHistoryModule,
    WorkerReviewModule,
    ServiceWorkerModule,
    ServicesModule,
    StoreReviewModule,
    ServiceCategoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
