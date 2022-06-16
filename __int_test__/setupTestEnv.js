const { build } = require("../src/app");

const setup_tables = `CREATE TABLE IF NOT EXISTS "public"."items" ( \
    "id" SERIAL PRIMARY KEY, \
    "name" TEXT NOT NULL, \
    "description" TEXT NOT NULL, \
    "gross_amount" DECIMAL, \
    "net_amount" DECIMAL, \
    "excluded_vat_amount" DECIMAL \
  )`;

const clear_tables = `DELETE FROM items`;
const insert_items =
  "INSERT INTO items (name, description, gross_amount, net_amount, excluded_vat_amount) VALUES ($1, $2, $3, $4, $5)";

module.exports = function setupTestEnv() {
  const app = build(
    { logger: true },
    {},
    {
      connectionString:
        "postgres://postgres:postgres@127.0.0.1:5432/postgres_test",
    }
  );

  beforeAll(async () => {
    await app.ready();
    await app.pg.query(setup_tables);
    await app.pg.query(clear_tables);
  });

  beforeEach(async () => {
    await app.pg.query(insert_items, ["samanta", "Hi", 50, 100, 10]);
  });

  afterEach(async () => {
    await app.pg.query(clear_tables);
  });

  afterAll(async () => {
    app.close();
  });

  return app;
};