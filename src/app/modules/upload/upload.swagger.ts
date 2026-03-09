export const uploadSwaggerDocs = {
  "/api/v1/upload/file": {
    post: {
      tags: ["Upload"],
      summary: "Upload Single File",
      description: "Upload a single image or document and receive the file URL",
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                file: {
                  type: "string",
                  format: "binary",
                  description: "Image or document file",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "File uploaded successfully",
        },
        400: {
          description: "Invalid file or validation error",
        },
      },
    },
  },

  "/api/v1/upload/files": {
    post: {
      tags: ["Upload"],
      summary: "Upload Multiple Files",
      description: "Upload multiple images or documents and receive their URLs",
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                files: {
                  type: "array",
                  items: {
                    type: "string",
                    format: "binary",
                  },
                  description: "Multiple files",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Files uploaded successfully",
        },
        400: {
          description: "Invalid files or validation error",
        },
      },
    },
  },
};
