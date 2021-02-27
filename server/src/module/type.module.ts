import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeController } from '../web/rest/type.controller';
import { TypeRepository } from '../repository/type.repository';
import { TypeService } from '../service/type.service';

@Module({
  imports: [TypeOrmModule.forFeature([TypeRepository])],
  controllers: [TypeController],
  providers: [TypeService],
  exports: [TypeService]
})
export class TypeModule {}
