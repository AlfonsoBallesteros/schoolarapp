import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { ReferenceDTO } from '../../service/dto/reference.dto';
import { ReferenceService } from '../../service/reference.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/references')
@ApiUseTags('references')
//@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
//@ApiBearerAuth()
export class ReferenceController {
  logger = new Logger('ReferenceController');

  constructor(private readonly referenceService: ReferenceService) {}

  @Get('/')
/*   @Roles(RoleType.STUDENT, RoleType.ADMIN, RoleType.PROFESSOR)
 */  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: ReferenceDTO
  })
  async getAll(@Req() req: Request): Promise<ReferenceDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.referenceService.findAndCount({
      skip: +pageRequest.page * pageRequest.size,
      take: +pageRequest.size,
      order: pageRequest.sort.asOrder()
    });
    HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
    return results;
  }

  @Get('/:id')
  /* @Roles(RoleType.STUDENT, RoleType.ADMIN, RoleType.PROFESSOR) */
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: ReferenceDTO
  })
  async getOne(@Param('id') id: string): Promise<ReferenceDTO> {
    return await this.referenceService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Create reference' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: ReferenceDTO
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() referenceDTO: ReferenceDTO): Promise<ReferenceDTO> {
    const created = await this.referenceService.save(referenceDTO);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Reference', created._id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update reference' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: ReferenceDTO
  })
  async put(@Req() req: Request, @Body() referenceDTO: ReferenceDTO): Promise<ReferenceDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Reference', referenceDTO._id);
    return await this.referenceService.update(referenceDTO);
  }

  @Delete('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Delete reference' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async deleteById(@Req() req: Request, @Param('id') id: string): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Reference', id);
    return await this.referenceService.deleteById(id);
  }
}
