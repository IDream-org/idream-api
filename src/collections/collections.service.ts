import { Injectable } from '@nestjs/common';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CollectionsRepository } from './collections.repository';
import { Users } from 'src/users/users.entity';

@Injectable()
export class CollectionsService {
  constructor(
    @InjectRepository(CollectionsRepository)
    private collectionsRepository: CollectionsRepository,
  ) {}

  create(createCollectionDto: CreateCollectionDto) {
    return 'This action adds a new collection';
  }

  getUserCollections(id: number) {
    return this.collectionsRepository.getByUser(id);
  }

  findOne(id: number) {
    return `This action returns a #${id} collection`;
  }

  update(id: number, updateCollectionDto: UpdateCollectionDto) {
    return `This action updates a #${id} collection`;
  }

  remove(id: number) {
    return `This action removes a #${id} collection`;
  }
}
