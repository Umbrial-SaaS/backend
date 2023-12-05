import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm"

export class Migrate1701694358539 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey('products',
            new TableForeignKey({
                columnNames: ["corporation_id"],
                referencedColumnNames: ['id'],
                referencedTableName: "corporations",
                onDelete: 'CASCADE',
                name: 'product_corporation'
            }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
