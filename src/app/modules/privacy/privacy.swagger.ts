export const privacySwaggerDocs = {
  "/api/v1/privacy/create": {
    post: {
      tags: ["privacy"],
      summary: "Create or update privacy content",
      description:
        "Create or update privacy, terms, about or faq content based on type",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["type", "title", "description", "photo"],
              properties: {
                type: {
                  type: "string",
                  enum: ["privacy", "terms", "about"],
                  example: "privacy",
                },
                title: {
                  type: "string",
                  example: "Privacy Policy",
                },
                description: {
                  type: "string",
                  example: "Your privacy content...",
                },
                photo: {
                  type: "string",
                  example: "https://cdn.site/privacy.png",
                },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Content saved successfully" },
        400: { description: "Validation error" },
      },
    },
  },

  "/api/v1/privacy": {
    get: {
      tags: ["privacy"],
      summary: "Get privacy content",
      description: "Get content by type query",
      parameters: [
        {
          name: "type",
          in: "query",
          required: true,
          schema: {
            type: "string",
            enum: ["privacy", "terms", "about"],
          },
          example: "privacy",
        },
      ],
      responses: {
        200: {
          description: "Content fetched successfully",
        },
      },
    },
  },
};
