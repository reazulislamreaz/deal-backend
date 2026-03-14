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
                  example: "https://cdn.example.com/machines/excavator.png",
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
          description: "Bad Request — Validation failed",
        },
      },
    },
  },

  "/api/v1/machine": {
    get: {
      tags: ["Machine"],
      summary: "Get all machines for web",
      description: "Retrieve paginated list of machines",

      parameters: [
        {
          name: "page",
          in: "query",
          description: "Page number",
          required: false,
          schema: {
            type: "integer",
            example: 1,
          },
        },
        {
          name: "limit",
          in: "query",
          description: "Number of machines per page",
          required: false,
          schema: {
            type: "integer",
            example: 10,
          },
        },
      ],

      responses: {
        200: {
          description: "Machines retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: {
                    type: "boolean",
                    example: true,
                  },
                  message: {
                    type: "string",
                    example: "Machines retrieved successfully",
                  },
                  meta: {
                    type: "object",
                    properties: {
                      page: {
                        type: "number",
                        example: 1,
                      },
                      limit: {
                        type: "number",
                        example: 10,
                      },
                      total: {
                        type: "number",
                        example: 42,
                      },
                      totalPage: {
                        type: "number",
                        example: 5,
                      },
                    },
                  },
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: {
                          type: "string",
                          example: "65cfdc6d8e1234567890abcd",
                        },
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
                          example: "Dhaka",
                        },
                        cost: {
                          type: "number",
                          example: 25000,
                        },
                        photo: {
                          type: "string",
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
            },
          },
        },
      },
    },
  },

  "/api/v1/machine/{id}": {
    get: {
      tags: ["Machine"],
      summary: "Get single machine",
      description: "Retrieve a single machine by ID",

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

      responses: {
        200: {
          description: "Machine retrieved successfully",
        },
        404: {
          description: "Machine not found",
        },
      },
    },

    patch: {
      tags: ["Machine"],
      summary: "Update machine",
      description: "Update machine information",

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
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  example: "Excavator X300",
                },
                type: {
                  type: "string",
                  example: "Heavy Construction",
                },
                location: {
                  type: "string",
                  example: "Chittagong",
                },
                cost: {
                  type: "number",
                  example: 30000,
                },
                photo: {
                  type: "string",
                  example: "https://cdn.example.com/machines/excavator_new.png",
                },
                status: {
                  type: "string",
                  example: "MAINTENANCE",
                },
              },
            },
          },
        },
      },

      responses: {
        200: {
          description: "Machine updated successfully",
        },
        400: {
          description: "Validation failed",
        },
      },
    },

    delete: {
      tags: ["Machine"],
      summary: "Delete machine",
      description: "Delete a machine by ID",

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

      responses: {
        200: {
          description: "Machine deleted successfully",
        },
        404: {
          description: "Machine not found",
        },
      },
    },
  },
  //
  "/api/v1/machine/my-machines": {
    get: {
      tags: ["Machine"],
      summary: "Get investor machines",
      description:
        "Retrieve machines where the authenticated investor has invested",

      security: [
        {
          bearerAuth: [],
        },
      ],

      parameters: [
        {
          name: "page",
          in: "query",
          description: "Page number",
          required: false,
          schema: {
            type: "integer",
            example: 1,
          },
        },
        {
          name: "limit",
          in: "query",
          description: "Number of machines per page",
          required: false,
          schema: {
            type: "integer",
            example: 10,
          },
        },
      ],

      responses: {
        200: {
          description: "Investor machines retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: {
                    type: "boolean",
                    example: true,
                  },
                  message: {
                    type: "string",
                    example: "My machines retrieved successfully",
                  },
                  meta: {
                    type: "object",
                    properties: {
                      page: {
                        type: "number",
                        example: 1,
                      },
                      limit: {
                        type: "number",
                        example: 10,
                      },
                      total: {
                        type: "number",
                        example: 5,
                      },
                      totalPage: {
                        type: "number",
                        example: 1,
                      },
                    },
                  },
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        machineId: {
                          type: "string",
                          example: "65cfdc6d8e1234567890abcd",
                        },
                        machineName: {
                          type: "string",
                          example: "Premium Snack Machine",
                        },
                        location: {
                          type: "string",
                          example: "Downtown Mall - Floor 2",
                        },
                        status: {
                          type: "string",
                          example: "ACTIVE",
                        },
                        totalPrice: {
                          type: "number",
                          example: 10000,
                        },
                        yourInvestment: {
                          type: "number",
                          example: 2800,
                        },
                        ownershipPercent: {
                          type: "number",
                          example: 18.7,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },

        401: {
          description: "Unauthorized — Token missing or invalid",
        },

        404: {
          description: "No machines found for this investor",
        },
      },
    },
  },
};
