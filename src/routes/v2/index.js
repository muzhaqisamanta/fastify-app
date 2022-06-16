const {
  get_options,
  get_item_options,
  post_options,
  put_options,
  delete_options,
} = require("./options");

const { vatcalculator } = require("../../utils/vat_calculator");


const itemRoute_v2 = (fastify, _, done) => {
  fastify.get("/", get_options, async (req, res) => {
    try {
      const { rows } = await fastify.pg.query("SELECT * FROM items");
      res.send(rows);
    } catch (err) {
      res.code(400).send(err);
    }
  });

  fastify.get("/:id", get_item_options, async (req, res) => {
    const { id } = req.params;
    try {
      const { rows } = await fastify.pg.query(
        "SELECT * FROM items WHERE id=$1",
        [id]
      );
      if (rows.length) res.send(rows[0]);
      else res.send({});
    } catch (err) {
      res.code(500);
    }
  });

  fastify.post("/", post_options, async (req, res) => {
    const { name, description, gross_amount } = req.body;
    try {
      const net_amount = vatcalculator.calculateNetAmount(gross_amount);
      const vat_amount = vatcalculator.calculateVat(net_amount);
      const { rows } = await fastify.pg.query(
        "INSERT INTO items (name, description, gross_amount, net_amount, excluded_vat_amount) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [name, description, gross_amount, net_amount, vat_amount]
      );
      res.code(201).send(rows[0]);
    } catch (err) {
      res.code(500).send(err);
    }
  });

  fastify.put("/:id", put_options, async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
      const { rows } = await fastify.pg.query(
        "UPDATE items SET name=$1, description=$2 WHERE id=$3 RETURNING *",
        [name, description, id]
      );
      if (rows.length) res.send(rows[0]);
      else res.code(400).send("Not a valid id");
    } catch (err) {
      res.code(500).send(err);
    }
  });

  fastify.delete("/:id", delete_options, async (req, res) => {
    const { id } = req.params;

    try {
      const { rowCount } = await fastify.pg.query(
        "DELETE FROM items WHERE id=$1",
        [id]
      );
      if (rowCount) res.send({ message: `Item ${id} deleted succesfully!` });
      else res.code(400);
    } catch (err) {
      res.code(500).send(err);
    }
  });

  done();
};

module.exports = {
  itemRoute_v2,
};
