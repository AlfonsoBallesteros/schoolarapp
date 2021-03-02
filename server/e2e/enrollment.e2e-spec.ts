import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { EnrollmentDTO } from '../src/service/dto/enrollment.dto';
import { EnrollmentService } from '../src/service/enrollment.service';

describe('Enrollment Controller', () => {
  let app: INestApplication;

  const authGuardMock = { canActivate: (): any => true };
  const rolesGuardMock = { canActivate: (): any => true };
  const entityMock: any = {
    id: 'entityId'
  };

  const serviceMock = {
    findById: (): any => entityMock,
    findAndCount: (): any => [entityMock, 0],
    save: (): any => entityMock,
    update: (): any => entityMock,
    deleteById: (): any => entityMock
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    })
      .overrideGuard(AuthGuard)
      .useValue(authGuardMock)
      .overrideGuard(RolesGuard)
      .useValue(rolesGuardMock)
      .overrideProvider(EnrollmentService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all enrollments ', async () => {
    const getEntities: EnrollmentDTO[] = (
      await request(app.getHttpServer())
        .get('/api/enrollments')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET enrollments by id', async () => {
    const getEntity: EnrollmentDTO = (
      await request(app.getHttpServer())
        .get('/api/enrollments/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create enrollments', async () => {
    const createdEntity: EnrollmentDTO = (
      await request(app.getHttpServer())
        .post('/api/enrollments')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update enrollments', async () => {
    const updatedEntity: EnrollmentDTO = (
      await request(app.getHttpServer())
        .put('/api/enrollments')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE enrollments', async () => {
    const deletedEntity: EnrollmentDTO = (
      await request(app.getHttpServer())
        .delete('/api/enrollments/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
