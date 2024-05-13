import { DataSource, Repository } from 'typeorm';
import { Collections } from './collections.entity';
import { Injectable } from '@nestjs/common';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { Users } from 'src/users/users.entity';

@Injectable()
export class CollectionsRepository extends Repository<Collections> {
  constructor(private dataSource: DataSource) {
    super(Collections, dataSource.createEntityManager());
  }

  public async getByUserId(id: number) {
    const collections = await this.find({
      where: [{ author: { id } }, { users: { userId: id } }],
    });
    return collections;
  }

  public async createCollection(
    user: Users,
    createCollectionDto: CreateCollectionDto,
  ): Promise<Collections> {
    const { title, image, private: privateKey } = createCollectionDto;
    const collection = this.create({
      title,
      image,
      private: privateKey,
      author: user,
    });

    await this.save(collection);
    return collection;
  }
}
