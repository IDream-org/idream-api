import { Users } from 'src/users/users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

enum Roles {
  Member = 'Member',
  Admin = 'Admin',
  Owner = 'Owner',
}

interface CollectionUsers {
  user: Users;
  userId: number;
  role: Roles;
}

@Entity()
export class Collections {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  title: string;

  @Column()
  image: string;

  @OneToOne(() => Users, { onDelete: 'CASCADE' })
  @JoinColumn()
  author: Users;

  @Column({ type: 'jsonb', default: [] })
  users: CollectionUsers[];

  @Column()
  categories: string;

  @Column()
  private: boolean;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date = new Date();
}
