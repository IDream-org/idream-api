import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  hashedPassword: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date = new Date();

  @Column({ nullable: true })
  emailVerified: Date;

  @Column({ nullable: true })
  interests: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  avatar: string;
}
