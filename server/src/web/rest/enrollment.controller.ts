import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { EnrollmentDTO } from '../../service/dto/enrollment.dto';
import { EnrollmentService } from '../../service/enrollment.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { UploadFileService } from '../../service/uploadfile.service';
import { UpdateEnrollmentDto } from '../../service/dto/update-enrollment.dto';
import { UploadFileDto } from '../../service/dto/upload-file.dto';

@Controller('api/enrollments')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('enrollments')
export class EnrollmentController {
  logger = new Logger('EnrollmentController');

  constructor(private readonly enrollmentService: EnrollmentService,
    private readonly uploadFile: UploadFileService,) { }

  @Get('/')
  @Roles(RoleType.ADMIN)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: EnrollmentDTO
  })
  async getAll(@Req() req: Request): Promise<EnrollmentDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.enrollmentService.findAndCount({
      skip: +pageRequest.page * pageRequest.size,
      take: +pageRequest.size,
      order: pageRequest.sort.asOrder()
    });
    HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
    return results;
  }


  @Post('/upload')
  @ApiOperation({ title: 'Upload Files' })
  @ApiResponse({
    status: 201,
    description: 'Uploaded files',
    type: UploadFileDto,
  })
  async uploadFiles(@Req() req: Request, @Body() uploadFileDto: UploadFileDto): Promise<any> {
    return await this.uploadFile.uploadFiles(req, uploadFileDto);
  }

  @Get('/:id')
  @Roles(RoleType.STUDENT, RoleType.ADMIN)
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: EnrollmentDTO
  })
  async getOne(@Param('id') id: string): Promise<EnrollmentDTO> {
    return await this.enrollmentService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.STUDENT, RoleType.ADMIN)
  @ApiOperation({ title: 'Create enrollment' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: EnrollmentDTO
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() enrollmentDTO: EnrollmentDTO): Promise<EnrollmentDTO> {
    const user: any = req.user;
    const created = await this.enrollmentService.save(user._id, enrollmentDTO);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Enrollment', created._id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.STUDENT, RoleType.ADMIN)
  @ApiOperation({ title: 'Update enrollment' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: EnrollmentDTO
  })
  async put(@Req() req: Request, @Body() enrollmentDTO: UpdateEnrollmentDto): Promise<EnrollmentDTO> {
    const updated = await this.enrollmentService.update(enrollmentDTO);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Enrollment', enrollmentDTO._id);
    return updated;
  }

  @Delete('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Delete enrollment' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async deleteById(@Req() req: Request, @Param('id') id: string): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Enrollment', id);
    return await this.enrollmentService.deleteById(id);
  }

  @Get('user/:id')
  @Roles(RoleType.STUDENT, RoleType.ADMIN)
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: EnrollmentDTO
  })
  async getEnrollmentUser(@Param('id') id: string): Promise<EnrollmentDTO> {
    return await this.enrollmentService.findByUser(id);
  }
}
