import { QueryRunner, Table, TableForeignKey } from "typeorm"

export class Migrate1705237185606 {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "corporation_staff_services",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "active",
                        type: "boolean",
                    },
                    {
                        name: "price",
                        type: "varchar",
                    },
                    {
                        name: "duration",
                        type: "varchar",
                    },
                    {
                        name: "corporation_staff_id",
                        type: "uuid",
                    },
                    {
                        name: "service_id",
                        type: "uuid",
                    },
                ],
            })
        );

        await queryRunner.createForeignKey(
            "corporation_staff_services",
            new TableForeignKey({
                columnNames: ["corporation_staff_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "corporation_staff",
                onDelete: "CASCADE",
            })
        );

        await queryRunner.createForeignKey(
            "corporation_staff_services",
            new TableForeignKey({
                columnNames: ["service_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "services",
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("corporation_staff_services");
    }
}