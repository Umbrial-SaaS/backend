import {MigrationInterface, QueryRunner} from "typeorm";

export class sellers1686789718687 implements MigrationInterface {
    name = 'sellers1686789718687'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sellers" ("id" character varying NOT NULL, "defaultSupportEmail" character varying, "defaultTwitterUrl" character varying, "defaultCurrency" character varying, "defaultInstagramUrl" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_97337ccbf692c58e6c7682de8a2" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "sellers"`);
    }

}
