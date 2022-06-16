const get_options = {
    schema: {
      response: {
        200: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: { type: "string" },
              description: { type: "string" },
              gross_amount: { type: "number" },
              net_amount: { type: "number" },
              excluded_vat_amount: { type: "number" },
            },
          },
        },
      },
    },
  };
  
  const get_item_options = {
    schema: {
      response: {
        200: {
          type: "object",
          properties: {
            name: { type: "string" },
            description: { type: "string" },
            gross_amount: { type: "number" },
            net_amount: { type: "number" },
            excluded_vat_amount: { type: "number" },
          },
        },
      },
    },
  };
  
  const post_options = {
    schema: {
      body: {
        required: ["name", "description", "gross_amount"],
        properties: {
          name: { type: "string" },
          description: { type: "string" },
          gross_amount: { type: "number" },

        },
      },
      response: {
        201: {
          type: "object",
          properties: {
            name: { type: "string" },
            description: { type: "string" },
            gross_amount: { type: "number" },
            net_amount: { type: "number" },
            excluded_vat_amount: { type: "number" },
          },
        },
      },
    },
  };
  
  const put_options = {
    schema: {
      body: {
        required: ["name", "description"],
        properties: {
          name: { type: "string" },
          description: { type: "string" },
        },
      },
      params: {
        type: "object",
        properties: {
          id: { type: "integer" },
        },
      },
      response: {
        201: {
          type: "object",
          properties: {
            name: { type: "string" },
            description: { type: "string" },
            gross_amount: { type: "number" },
            net_amount: { type: "number" },
            excluded_vat_amount: { type: "number" },
          },
        },
      },
    },
  };
  
  const delete_options = {
    schema: {
      params: {
        type: "object",
        properties: {
          id: { type: "integer" },
        },
      },
      response: {
        200: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
  };
  
  module.exports = {
    get_options,
    get_item_options,
    post_options,
    put_options,
    delete_options,
  };