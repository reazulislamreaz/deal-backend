export const userSwaggerDocs = {
  "/api/v1/user/update-profile": {
    patch: {
      tags: ["User"],
      summary: "Update user profile",
      description:
        "Updates the authenticated user's profile information including profile image URL.",
      security: [{ bearerAuth: [] }],

      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  example: "John Doe",
                },
                photo: {
                  type: "string",
                  format: "uri",
                  example: "https://cdn.example.com/users/profile_123.png",
                  description: "Profile image URL",
                },
              },
            },
          },
        },
      },

      responses: {
        200: {
          description: "User profile updated successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Profile updated successfully",
                  },
                  data: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string",
                        example: "64b2e1b9d1234f0012ab5678",
                      },
                      name: { type: "string", example: "John Doe" },
                      email: {
                        type: "string",
                        example: "john.doe@example.com",
                      },
                      photo: {
                        type: "string",
                        example:
                          "https://cdn.example.com/users/profile_123.png",
                      },
                      role: { type: "string", example: "USER" },
                      updatedAt: {
                        type: "string",
                        example: "2025-10-10T10:00:00Z",
                      },
                    },
                  },
                },
              },
            },
          },
        },
        400: {
          description: "Bad Request — Validation failed",
        },
        401: {
          description: "Unauthorized — must be logged in",
        },
      },
    },
  },
  // get all
  "/api/v1/user": {
    get: {
      tags: ["User"],
      summary: "Get all users",
      security: [{ bearerAuth: [] }],

      parameters: [
        {
          name: "page",
          in: "query",
          schema: { type: "number", example: 1 },
        },
        {
          name: "limit",
          in: "query",
          schema: { type: "number", example: 10 },
        },
      ],

      responses: {
        200: {
          description: "Users retrieved successfully",
        },
      },
    },
  },
  // get specific
  "/api/v1/user/{id}": {
    get: {
      tags: ["User"],
      summary: "Get user details",
      security: [{ bearerAuth: [] }],

      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
        },
      ],

      responses: {
        200: {
          description: "User details retrieved successfully",
        },
      },
    },
  },
  // delete user
  "/api/v1/user/suspend/{id}": {
    patch: {
      tags: ["User"],
      summary: "Suspend user",
      description: "Soft delete user by changing status to SUSPENDED",
      security: [{ bearerAuth: [] }],

      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
        },
      ],

      responses: {
        200: {
          description: "User suspended successfully",
        },
      },
    },
  },
};
