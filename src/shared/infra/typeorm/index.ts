import Corporation from "@modules/v1/corporations/infra/data/entities/Corporation"
import CorporationService from "@modules/v1/corporations/infra/data/entities/CorporationService"
import CorporationStaff from "@modules/v1/corporations/infra/data/entities/CorporationStaff"
import Product from "@modules/v1/products/infra/data/entities/Product"
import Seller from "@modules/v1/sellers/infra/data/entities/Seller"
import Person from "@modules/v1/users/infra/data/entities/Person"
import RefreshToken from "@modules/v1/users/infra/data/entities/RefreshToken"
import Role from "@modules/v1/users/infra/data/entities/Role"
import User from "@modules/v1/users/infra/data/entities/User"
import UserRole from "@modules/v1/users/infra/data/entities/UserRole"
import "reflect-metadata"
import { DataSource } from "typeorm"

const AppDataSource = new DataSource({
  type: "mysql",
  host: "umbrialmysql.cwydlqme5ewg.us-east-1.rds.amazonaws.com",
  port: 3306,
  username: "umbrial",
  password: "u7v$8N8e",
  database: "local",
  entities: [
    User,
    Seller,
    Product,
    UserRole,
    Role,
    Corporation,
    RefreshToken,
    Person,
    CorporationService,
    CorporationStaff
  ],
  migrations: ['./migrations/*.ts'],
  synchronize: false,
  logging: true,
})

AppDataSource.initialize()
  .then(() => {
    AppDataSource.runMigrations()
    console.log('[DATABASE] Typeorm initiazed.')
  })
  .catch((error) => console.log(error))

export default AppDataSource 