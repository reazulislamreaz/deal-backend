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
      description: "Retrieve a list of all machines",

      responses: {
        200: {
          description: "Machines retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Machines retrieved successfully",
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
};
