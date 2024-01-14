import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class Migrate1705102287720 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "corporations",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "active",
                        type: "boolean",
                        default: false,
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "description",
                        type: "varchar",
                    },
                    {
                        name: "instagram",
                        type: "varchar",
                    },
                ],
            })
        );

        await queryRunner.createTable(
            new Table({
                name: "services",
                columns: [
                    {
                        name: "id",
                        type: "int4",
                        isPrimary: true,
                    },
                    {
                        name: "active",
                        type: "boolean",
                        default: false,
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "description",
                        type: "varchar",
                    },
                    {
                        name: "price",
                        type: "int",
                    },
                ],
            })
        );
        await queryRunner.createTable(
            new Table({
                name: "corporation_services",
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
                        name: "corporation_id",
                        type: "uuid",
                    },
                    {
                        name: "service_id",
                        type: "int4",
                    },
                ],
            })
        );

        await queryRunner.createForeignKey(
            "corporation_services",
            new TableForeignKey({
                columnNames: ["corporation_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "corporations",
                onDelete: "CASCADE",
            })
        );

        await queryRunner.createForeignKey(
            "corporation_services",
            new TableForeignKey({
                columnNames: ["service_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "services",
                onDelete: "CASCADE",
            })
        );

        await queryRunner.createTable(
            new Table({
                name: "corporation_staff",
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
                        name: "role",
                        type: "int",
                    },
                    {
                        name: "user_id",
                        type: "uuid",
                    },
                    {
                        name: "corporation_id",
                        type: "uuid",
                    },
                ],
            })
        );

        await queryRunner.createForeignKey(
            "corporation_staff",
            new TableForeignKey({
                columnNames: ["user_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "CASCADE",
            })
        );

        await queryRunner.createForeignKey(
            "corporation_staff",
            new TableForeignKey({
                columnNames: ["corporation_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "corporations",
                onDelete: "CASCADE",
            })
        );

        await queryRunner.createTable(
            new Table({
                name: "corporation_customers",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "person_id",
                        type: "uuid",
                    },
                    {
                        name: "corporation_id",
                        type: "uuid",
                    },
                ],
            })
        );

        await queryRunner.createForeignKey(
            "corporation_customers",
            new TableForeignKey({
                columnNames: ["person_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "persons",
                onDelete: "CASCADE",
            })
        );

        await queryRunner.createForeignKey(
            "corporation_customers",
            new TableForeignKey({
                columnNames: ["corporation_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "corporations",
                onDelete: "CASCADE",
            })
        );
        await queryRunner.createTable(
            new Table({
                name: "products",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "active",
                        type: "boolean",
                        default: false,
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "description",
                        type: "varchar",
                    },
                    {
                        name: "price",
                        type: "int",
                    },
                    {
                        name: "periodicity",
                        type: "varchar",
                    },
                    {
                        name: "currency",
                        type: "varchar",
                    },
                    {
                        name: "is_subscription",
                        type: "boolean",
                    },
                ],
            })
        );

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
                        type: "int4",
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

        await queryRunner.query(`
        INSERT INTO services (id, active, name, description, price)
        VALUES
        (1, true, 'Corte Degradê', 'Corte de cabelo degradê masculino', 30),
        (2, true, 'Corte Nevou', 'Corte de cabelo estilo nevou para homens', 25),
        (3, true, 'Progressiva Masculina', 'Serviço de progressiva capilar para homens', 50),
        (4, true, 'Barba Tradicional', 'Corte e modelagem de barba tradicional masculina', 20),
        (5, true, 'Hidratação Capilar Masculina', 'Tratamento de hidratação para cabelos masculinos', 40),
        (6, true, 'Coloração Masculina', 'Serviço de coloração para cabelos masculinos', 35),
        (7, true, 'Corte Feminino', 'Corte de cabelo feminino', 40),
        (8, true, 'Penteado Masculino', 'Serviço de penteado masculino para eventos', 25),
        (9, true, 'Manicure para Homens', 'Cuidado e pintura de unhas masculinas', 20),
        (10, true, 'Pedicure para Homens', 'Cuidado e pintura de unhas dos pés masculinas', 25),
        (11, true, 'Massagem Relaxante para Homens', 'Massagem relaxante masculina', 50),
        (12, true, 'Design de Sobrancelha', 'Modelagem de sobrancelhas unissex', 15),
        (13, true, 'Depilação Masculina', 'Serviço de depilação corporal masculina', 30),
        (14, true, 'Maquiagem', 'Serviço de maquiagem profissional unissex', 40),
        (15, true, 'Corte Infantil', 'Corte de cabelo infantil unissex', 25),
        (16, true, 'Tintura de Sobrancelha', 'Coloração de sobrancelhas unissex', 15),
        (17, true, 'Tratamento Capilar Reconstrutivo', 'Tratamento capilar reconstrutivo unissex', 60),
        (18, true, 'Corte a Seco', 'Corte de cabelo a seco unissex', 30),
        (19, true, 'Tratamento Facial', 'Tratamento estético facial unissex', 45);
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
