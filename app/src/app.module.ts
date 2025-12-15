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
import { ImagesModule } from './images/images.module';
import { AdressesModule } from './adresses/adresses.module';
import { StoreImagesModule } from './store_images/store_images.module';
import { CountriesModule } from './countries/countries.module';
import { CitiesModule } from './cities/cities.module';
import { StoreCategoryModule } from './store-category/store-category.module'
import { StatusModule } from './status/status.module';
import { UserWorkerModule } from './user-worker/user-worker.module';
import { StoresModule } from './stores/stores.module';
import { ServiceHistoryModule } from './service-history/service-history.module';
import { ServicesModule } from './services/services.module';

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
    ImagesModule,
    AdressesModule,
    StoreImagesModule,
    CountriesModule,
    CitiesModule,
    StoreCategoryModule,
    StatusModule,
    UserWorkerModule,
    StoresModule,
    ServiceHistoryModule,
    ServicesModule,
    
  ],
controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
