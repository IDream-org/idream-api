import { Module } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { CollectionsController } from './collections.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collections } from './collections.entity';
import { CollectionsRepository } from './collections.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Collections]), AuthModule],
  controllers: [CollectionsController],
  providers: [CollectionsService, CollectionsRepository],
})
export class CollectionsModule {}
