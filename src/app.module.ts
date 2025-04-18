import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feature } from './typeorm/entities/Feature';
import { FeaturesModule } from './features/features.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      synchronize: true,
      entities: [Feature]
    }),
    FeaturesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
