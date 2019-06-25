import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export interface IConfig {
    port: number;
    debugLogging: boolean;
    dbsslconn: boolean;
    jwtSecret: string;
    databaseUrl: string;
}
export interface KConfig {
    DATABASE: string,
    USERNAME: string,
    PASSWORD: string,
    PORT: number,
    HOST: string
}

const config: IConfig = {
    port: +process.env.PORT || 3006,
    debugLogging: process.env.NODE_ENV == 'development',
    dbsslconn: process.env.NODE_ENV != 'development',
    jwtSecret: process.env.JWT_SECRET || 'your-secret-whatever',
    databaseUrl: process.env.DATABASE_URL || 'postgres://user:pass@localhost:5432/apidb'
};
const koa: KConfig  = {
    DATABASE: 'koa',
    USERNAME: 'root',
    PASSWORD: '123456',
    PORT: 3306,
    HOST: '39.106.12.146'
}

export { config, koa };