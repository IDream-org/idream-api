import { DataSource, Repository } from 'typeorm';
import { Collections } from './collections.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CollectionsRepository extends Repository<Collections> {
  constructor(private dataSource: DataSource) {
    super(Collections, dataSource.createEntityManager());
  }

  public async getByUser(id: number) {
    this.find({
      where: [{ author: { id } }, { users: { userId: id } }],
    });
  }
}
