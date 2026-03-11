export const voteSwaggerDocs = {
  "/api/v1/vote/create": {
    post: {
      tags: ["Vote"],
      summary: "Investor vote maintenance",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["maintenance_id", "vote"],
              properties: {
                maintenance_id: {
                  type: "string",
                  example: "687c2d3a8f2390b12a9d7f11",
                },
                vote: {
                  type: "string",
                  enum: ["APPROVE", "DECLINE"],
                  example: "APPROVE",
                },
              },
            },
          },
        },
      },
      responses: {
        201: { description: "Vote submitted successfully" },
      },
    },
  },

  "/api/v1/vote/result/{maintenanceId}": {
    get: {
      tags: ["Vote"],
      summary: "Admin view vote results",
      parameters: [
        {
          name: "maintenanceId",
          in: "path",
          required: true,
          schema: { type: "string" },
        },
      ],
      responses: {
        200: { description: "Vote results retrieved successfully" },
      },
    },
  },
};
