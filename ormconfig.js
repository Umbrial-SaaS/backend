export default {
  "type": "postgres",
  "url": process.env.DATABASE_URI,
  "entities": [
    "./src/modules/**/infra/typeorm/entities/*.ts"
  ],
  "migrations": [
    "./src/shared/infra/typeorm/migrations/*.ts"
  ],
  "seeds": [
    "/src/shared/infra/typeorm/seeds"
  ],
  "cli": {
    "migrationsDir": "./src/shared/infra/typeorm/migrations"
  }
}
