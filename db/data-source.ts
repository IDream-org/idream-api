import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

config();
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.BD_PASSWORD,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/db/migrations/*{.ts,.js}'],
  synchronize: false,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
