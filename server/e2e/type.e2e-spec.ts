import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { TypeDTO } from '../src/service/dto/type.dto';
import { TypeService } from '../src/service/type.service';

describe('Type Controller', () => {
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
      .overrideProvider(TypeService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all types ', async () => {
    const getEntities: TypeDTO[] = (
      await request(app.getHttpServer())
        .get('/api/types')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET types by id', async () => {
    const getEntity: TypeDTO = (
      await request(app.getHttpServer())
        .get('/api/types/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create types', async () => {
    const createdEntity: TypeDTO = (
      await request(app.getHttpServer())
        .post('/api/types')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update types', async () => {
    const updatedEntity: TypeDTO = (
      await request(app.getHttpServer())
        .put('/api/types')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE types', async () => {
    const deletedEntity: TypeDTO = (
      await request(app.getHttpServer())
        .delete('/api/types/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
