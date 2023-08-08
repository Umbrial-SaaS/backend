import Product from "@modules/v1/products/infra/data/entities/Product"
import Seller from "@modules/v1/sellers/infra/data/entities/Seller"
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
    "dist/modules/v1/**/infra/data/entities/*.entity{.ts,.js}",
    "src/modules/v1/**/infra/data/entities/*.entity{.ts,.js}",
    User,
    Seller,
    Product,
    UserRole,
    Role
  ],
  synchronize: true,
  logging: false,
})

AppDataSource.initialize()
  .then(() => {
    console.log('[DATABASE] Typeorm initiazed.')
  })
  .catch((error) => console.log(error))

export { AppDataSource }