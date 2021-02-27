import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonController } from '../web/rest/person.controller';
import { PersonRepository } from '../repository/person.repository';
import { PersonService } from '../service/person.service';

@Module({
  imports: [TypeOrmModule.forFeature([PersonRepository])],
  controllers: [PersonController],
  providers: [PersonService],
  exports: [PersonService]
})
export class PersonModule {}
