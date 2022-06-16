const setupTestEnv = require("./setupTestEnv");

const app = setupTestEnv();

describe("Integration test for CRUD operations to test our database", () => {
  test("Should create an item", async () => {
    const item = {
      name: "Test item ",
      description: "This is a test item",
      gross_amount: 20,
      net_amount: 16.67,
      excluded_vat_amount: 3.33,
    };

    const response = await app.inject({
      method: "POST",
      url: "/v2",
      payload: item,
    });

    expect(response.statusCode).toBe(201);
    expect(response.json()).toMatchObject(item);
  });
});