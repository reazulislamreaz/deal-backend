export const machineSwaggerDocs = {
  "/api/v1/machine/create": {
    post: {
      tags: ["Machine"],
      summary: "Create machine",
      description: "Creates a new machine",

      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["name", "type", "location", "cost", "photo"],
              properties: {
                name: {
                  type: "string",
                  example: "Excavator X200",
                },
                type: {
                  type: "string",
                  example: "Construction",
                },
                location: {
                  type: "string",
                  example: "Dhaka Warehouse",
                },
                cost: {
                  type: "number",
                  example: 25000,
                },
                photo: {
                  type: "string",
                  format: "uri",
                  example:
                    "https://cdn.example.com/machines/excavator.png",
                },
                status: {
                  type: "string",
                  example: "ACTIVE",
                },
              },
            },
          },
        },
      },

      responses: {
        201: {
          description: "Machine created successfully",
        },
        400: {
          description: "Bad request",
        },
      },
    },
  },
};