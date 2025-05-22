import { Module } from '@nestjs/common';
import { TypeOrmModule, type TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';

const pgOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pass123',
  database: 'track-wise',
  autoLoadEntities: true,
  synchronize: true,
};

@Module({
  imports: [CoffeesModule, TypeOrmModule.forRoot(pgOptions)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
