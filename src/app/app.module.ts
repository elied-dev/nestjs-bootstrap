import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { routes } from 'src/api/routes';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from 'src/api/api.module';

@Module({
  imports: [RouterModule.register(routes), ApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
