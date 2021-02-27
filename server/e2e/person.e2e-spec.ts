import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { PersonDTO } from '../src/service/dto/person.dto';
import { PersonService } from '../src/service/person.service';

describe('Person Controller', () => {
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
      .overrideProvider(PersonService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all people ', async () => {
    const getEntities: PersonDTO[] = (
      await request(app.getHttpServer())
        .get('/api/people')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET people by id', async () => {
    const getEntity: PersonDTO = (
      await request(app.getHttpServer())
        .get('/api/people/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create people', async () => {
    const createdEntity: PersonDTO = (
      await request(app.getHttpServer())
        .post('/api/people')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update people', async () => {
    const updatedEntity: PersonDTO = (
      await request(app.getHttpServer())
        .put('/api/people')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE people', async () => {
    const deletedEntity: PersonDTO = (
      await request(app.getHttpServer())
        .delete('/api/people/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
