export const maintenanceSwaggerDocs = {
  "/api/v1/maintenance/create": {
    post: {
      tags: ["Maintenance"],
      summary: "Create maintenance",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["machine_id", "description", "cost"],
              properties: {
                machine_id: {
                  type: "string",
                  example: "687c2d3a8f2390b12a9d7f11",
                },
                description: {
                  type: "string",
                  example: "Motor repair",
                },
                photo: {
                  stye: "string",
                  example: "https://static.vecteezy.com/vite/assets/photo-masthead-375-BoK_p8LG.webp",
                },
                cost: {
                  type: "number",
                  example: 250,
                },
              },
            },
          },
        },
      },
      responses: {
        201: { description: "Maintenance created successfully" },
      },
    },
  },

  "/api/v1/maintenance": {
    get: {
      tags: ["Maintenance"],
      summary: "Get all maintenances",
      parameters: [
        { name: "page", in: "query", schema: { type: "number", example: 1 } },
        { name: "limit", in: "query", schema: { type: "number", example: 10 } },
      ],
      responses: {
        200: { description: "Maintenances retrieved successfully" },
      },
    },
  },

  "/api/v1/maintenance/{id}": {
    get: {
      tags: ["Maintenance"],
      summary: "Get maintenance details",
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } },
      ],
      responses: {
        200: { description: "Maintenance retrieved" },
      },
    },
  },
};
