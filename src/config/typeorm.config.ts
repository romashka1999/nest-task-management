import { join } from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'Adjara23',
    database: 'tasks',
    entities: [join(__dirname, '/../**/*.entity{.ts,.js}')],
    synchronize: true,
    logging: false
}