import { MigrationInterface, QueryRunner } from "typeorm";

export class CollectionsTable1715616321968 implements MigrationInterface {
    name = 'CollectionsTable1715616321968'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "collections" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "image" character varying NOT NULL, "users" jsonb NOT NULL DEFAULT '[]', "categories" character varying NOT NULL, "private" boolean NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "authorId" uuid, CONSTRAINT "REL_9054efaa6603a997ac9a0a6032" UNIQUE ("authorId"), CONSTRAINT "PK_21c00b1ebbd41ba1354242c5c4e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "collections" ADD CONSTRAINT "FK_9054efaa6603a997ac9a0a60326" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "collections" DROP CONSTRAINT "FK_9054efaa6603a997ac9a0a60326"`);
        await queryRunner.query(`DROP TABLE "collections"`);
    }

}
