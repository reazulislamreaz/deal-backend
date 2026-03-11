export const machineRevenueSwaggerDocs = {
  "/api/v1/machine-revenue": {
    post: {
      tags: ["Machine Revenue"],
      summary: "Create machine monthly revenue",
      description: "Admin inserts monthly revenue data for a machine",

      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: [
                "machineId",
                "month",
                "revenue",
                "expenses",
                "maintenanceCost",
              ],
              properties: {
                machineId: {
                  type: "string",
                  example: "665b45e2d51c2d7a4d111111",
                },
                month: {
                  type: "string",
                  example: "2026-02",
                },
                revenue: {
                  type: "number",
                  example: 3000,
                },
                expenses: {
                  type: "number",
                  example: 1500,
                },
                maintenanceCost: {
                  type: "number",
                  example: 410,
                },
              },
            },
          },
        },
      },

      responses: {
        201: {
          description: "Machine revenue created successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  message: {
                    type: "string",
                    example: "Machine revenue created successfully",
                  },
                  data: {
                    type: "object",
                    properties: {
                      machineId: { type: "string" },
                      month: { type: "string" },
                      revenue: { type: "number" },
                      expenses: { type: "number" },
                      maintenanceCost: { type: "number" },
                      profit: { type: "number" },
                    },
                  },
                },
              },
            },
          },
        },
        400: {
          description: "Validation error",
        },
      },
    },
  },

  "/api/v1/machine-revenue/{machineId}": {
    get: {
      tags: ["Machine Revenue"],
      summary: "Get machine revenue by month",
      description:
        "Retrieve monthly revenue information for a specific machine",

      parameters: [
        {
          name: "machineId",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
          example: "665b45e2d51c2d7a4d111111",
        },
        {
          name: "month",
          in: "query",
          required: true,
          schema: {
            type: "string",
          },
          example: "2026-02",
        },
      ],

      responses: {
        200: {
          description: "Machine revenue retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  message: {
                    type: "string",
                    example: "Machine revenue retrieved successfully",
                  },
                  data: {
                    type: "object",
                    properties: {
                      machineId: { type: "string" },
                      month: { type: "string" },
                      revenue: { type: "number" },
                      expenses: { type: "number" },
                      maintenanceCost: { type: "number" },
                      profit: { type: "number" },
                    },
                  },
                },
              },
            },
          },
        },
        404: {
          description: "Machine revenue not found",
        },
      },
    },
  },
};
