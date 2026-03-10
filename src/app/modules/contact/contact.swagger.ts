export const contactSwaggerDocs = {
  "/api/v1/contact/save": {
    post: {
      tags: ["contact"],
      summary: "Create or update contact",
      description: "Creates contact if not exists otherwise updates it",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: [
                "phone_number",
                "open_time",
                "close_time",
                "available_days",
              ],
              properties: {
                phone_number: { type: "string", example: "+8801700000000" },
                open_time: { type: "string", example: "08:00 AM" },
                close_time: { type: "string", example: "07:30 PM" },
                available_days: {
                  type: "string",
                  example: "Monday to Friday",
                },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Contact saved successfully" },
      },
    },
  },

  "/api/v1/contact": {
    get: {
      tags: ["contact"],
      summary: "Get contact info",
      responses: {
        200: { description: "Contact fetched successfully" },
      },
    },
  },
};
