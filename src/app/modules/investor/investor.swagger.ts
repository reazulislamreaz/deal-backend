export const investorSwaggerDocs = {
  "/api/v1/investor/create": {
    post: {
      tags: ["Investor"],
      summary: "Add investor",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: [
                "email",
                "machine_id",
                "investment_amount",
                "ownership_percent",
                "investment_proof",
              ],
              properties: {
                email: { type: "string", example: "user@email.com" },
                machine_id: { type: "string" },
                investment_amount: { type: "number", example: 250 },
                ownership_percent: { type: "number", example: 10 },
                investment_proof: {
                  type: "string",
                  example: "https://cdn.com/proof.png",
                },
              },
            },
          },
        },
      },
      responses: {
        201: { description: "Investor created successfully" },
      },
    },
  },

  "/api/v1/investor": {
    get: {
      tags: ["Investor"],
      summary: "Get all investors",
      parameters: [
        { name: "page", in: "query", schema: { type: "number", example: 1 } },
        { name: "limit", in: "query", schema: { type: "number", example: 10 } },
      ],
      responses: {
        200: { description: "Investors retrieved successfully" },
      },
    },
  },

  "/api/v1/investor/{id}": {
    get: {
      tags: ["Investor"],
      summary: "Get investor details",
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } },
      ],
      responses: {
        200: { description: "Investor details retrieved" },
      },
    },
  },

  "/api/v1/investor/suspend/{accountId}": {
    patch: {
      tags: ["Investor"],
      summary: "Suspend investor",
      parameters: [
        {
          name: "accountId",
          in: "path",
          required: true,
          schema: { type: "string" },
        },
      ],
      responses: {
        200: { description: "Investor suspended successfully" },
      },
    },
  },
  "/api/v1/investor/update/{id}": {
    patch: {
      tags: ["Investor"],
      summary: "Update investor",
      description: "Update investor investment information",

      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],

      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                investment_amount: {
                  type: "number",
                  example: 500,
                },
                ownership_percent: {
                  type: "number",
                  example: 15,
                },
                investment_proof: {
                  type: "string",
                  example: "https://cdn.example.com/investment/proof.png",
                },
              },
            },
          },
        },
      },

      responses: {
        200: {
          description: "Investor updated successfully",
        },
        400: {
          description: "Validation error",
        },
        404: {
          description: "Investor not found",
        },
      },
    },
  },
  // dashboard
  "/api/v1/investor/dashboard": {
    get: {
      tags: ["Investor"],
      summary: "Get investor dashboard",
      description: "Retrieve investor dashboard statistics",

      responses: {
        200: {
          description: "Dashboard retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  message: {
                    type: "string",
                    example: "Investor dashboard retrieved successfully",
                  },
                  data: {
                    type: "object",
                    properties: {
                      totalInvested: { type: "number", example: 25000 },
                      activeMachines: { type: "number", example: 3 },
                      totalEarnings: { type: "number", example: 1830 },
                      thisMonthProfit: { type: "number", example: 520 },
                      maintenanceCost: { type: "number", example: 410 },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
