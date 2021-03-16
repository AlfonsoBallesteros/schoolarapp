import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { TypeDTO } from '../../service/dto/type.dto';
import { TypeService } from '../../service/type.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/types')
@UseInterceptors(LoggingInterceptor)
@ApiUseTags('types')
export class TypeController {
  logger = new Logger('TypeController');

  constructor(private readonly typeService: TypeService) {}

  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: TypeDTO
  })
  async getAll(@Req() req: Request): Promise<TypeDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.typeService.findAndCount({
      skip: +pageRequest.page * pageRequest.size,
      take: +pageRequest.size,
      order: pageRequest.sort.asOrder()
    });
    HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
    return results;
  }

  @Get('/:id')
  //@Roles(RoleType.STUDENT, RoleType.PROFESSOR, RoleType.ADMIN)
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: TypeDTO
  })
  async getOne(@Param('id') id: string): Promise<TypeDTO> {
    return await this.typeService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Create type' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: TypeDTO
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() typeDTO: TypeDTO): Promise<TypeDTO> {
    const created = await this.typeService.save(typeDTO);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Type', created._id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update type' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: TypeDTO
  })
  async put(@Req() req: Request, @Body() typeDTO: TypeDTO): Promise<TypeDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Type', typeDTO._id);
    return await this.typeService.update(typeDTO);
  }

  @Delete('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Delete type' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async deleteById(@Req() req: Request, @Param('id') id: string): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Type', id);
    return await this.typeService.deleteById(id);
  }
}
