import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { MongoMemoryServer } from 'mongodb-memory-server';
async function ormConfig(): Promise<TypeOrmModuleOptions> {
    const mongod = new MongoMemoryServer();
    const commonConf = {
        SYNCRONIZE: false,
        ENTITIES: [__dirname + '/domain/*.entity{.ts,.js}'],
        MIGRATIONS: [__dirname + '/migrations/**/*{.ts,.js}'],
        CLI: {
            migrationsDir: 'src/migrations',
        },
        MIGRATIONS_RUN: true,
    };

    let ormconfig: TypeOrmModuleOptions = {
        name: 'default',
        type: 'mongodb',
        host: 'localhost',
        port: await mongod.getPort(),
        database: await mongod.getDbName(),
        useNewUrlParser: true,
        useUnifiedTopology: true,
        logging: true,
        synchronize: true,
        entities: commonConf.ENTITIES,
        migrations: commonConf.MIGRATIONS,
        cli: commonConf.CLI,
        migrationsRun: commonConf.MIGRATIONS_RUN,
    };

    if (process.env.NODE_ENV === 'prod') {
        ormconfig = {
            name: 'default',
            type: 'mongodb',
            database: 'schoolarapp',
            host: 'localhost',
            port: 27018,
            username: 'sa',
            password: 'yourStrong(!)Password',
            logging: false,
            synchronize: commonConf.SYNCRONIZE,
            entities: commonConf.ENTITIES,
            migrations: commonConf.MIGRATIONS,
            cli: commonConf.CLI,
            migrationsRun: commonConf.MIGRATIONS_RUN,
        };
    }

    if (process.env.NODE_ENV === 'test') {
        ormconfig = {
            name: 'default',
            type: 'mongodb',
            host: 'localhost',
            port: await mongod.getPort(),
            database: await mongod.getDbName(),
            useNewUrlParser: true,
            useUnifiedTopology: true,
            keepConnectionAlive: true,
            logging: true,
            synchronize: true,
            entities: commonConf.ENTITIES,
            migrations: commonConf.MIGRATIONS,
            cli: commonConf.CLI,
            migrationsRun: commonConf.MIGRATIONS_RUN,
        };
    }
    return ormconfig;
}

export { ormConfig };
