import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { PersonDTO } from '../../service/dto/person.dto';
import { PersonService } from '../../service/person.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UpdatePersonDto } from '../../service/dto/update-person.dto';

@Controller('api/people')
//@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
//@ApiBearerAuth()
@ApiUseTags('people')
export class PersonController {
  logger = new Logger('PersonController');

  constructor(private readonly personService: PersonService) { }

  @Get('/')
  @Roles(RoleType.ADMIN)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: PersonDTO
  })
  async getAll(@Req() req: Request): Promise<PersonDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.personService.findAndCount({
      skip: +pageRequest.page * pageRequest.size,
      take: +pageRequest.size,
      order: pageRequest.sort.asOrder()
    });
    HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
    return results;
  }

  @Get('/:id')
  @Roles(RoleType.STUDENT)
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: PersonDTO
  })
  async getOne(@Param('id') id: string): Promise<PersonDTO> {
    return await this.personService.findById(id);
  }

  @PostMethod('/')
  //@Roles(RoleType.ADMIN, RoleType.STUDENT)
  @ApiOperation({ title: 'Create person' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: PersonDTO
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() personDTO: PersonDTO): Promise<PersonDTO> {
    const created = await this.personService.save(personDTO);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Person', created._id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.ADMIN, RoleType.STUDENT)
  @ApiOperation({ title: 'Update person' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: PersonDTO
  })
  async put(@Req() req: Request, @Body() personDTO: UpdatePersonDto): Promise<PersonDTO> {
    const updated = await this.personService.update(personDTO);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Person', personDTO._id);
    return updated;
  }

  @Delete('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Delete person' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async deleteById(@Req() req: Request, @Param('id') id: string): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Person', id);
    return await this.personService.deleteById(id);
  }

  @Get('/parents/:id')
  @Roles(RoleType.STUDENT, RoleType.ADMIN)
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: PersonDTO
  })
  async getAllParents(@Param('id') id: string): Promise<PersonDTO[]> {
    return await this.personService.findParents(id);
  }

}
