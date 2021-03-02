import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReferenceController } from '../web/rest/reference.controller';
import { ReferenceRepository } from '../repository/reference.repository';
import { ReferenceService } from '../service/reference.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReferenceRepository])],
  controllers: [ReferenceController],
  providers: [ReferenceService],
  exports: [ReferenceService]
})
export class ReferenceModule {}
