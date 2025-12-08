import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres', //  your DB username
      password: '123456', //  replace with your PostgreSQL password
      database: 'mydb', //  use the main DB or create new
      autoLoadEntities: true, //  load all entities automatically
      synchronize: true, //  auto-creates tables (only for dev)
    }),
    UsersModule,
    AuthModule
  ],
})
export class AppModule {}
