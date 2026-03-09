export const authSwaggerDocs = {
  "/api/v1/auth/register": {
    post: {
      tags: ["Auth"],
      summary: "Register a new user",
      description:
        "Create a new user account with email, number, password, and name.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["email", "number", "password", "name"],
              properties: {
                email: { type: "string", example: "user@example.com" },
                number: { type: "string", example: "+1234567890" },
                password: { type: "string", example: "secret123" },
                name: { type: "string", example: "John Doe" },
              },
            },
          },
        },
      },
      responses: {
        201: { description: "User registered successfully" },
        400: { description: "Validation error or user already exists" },
      },
    },
  },

  "/api/v1/auth/login": {
    post: {
      tags: ["Auth"],
      summary: "Login a user",
      description: "Authenticate user with email and password.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["email", "password"],
              properties: {
                email: { type: "string", example: "user@example.com" },
                password: { type: "string", example: "secret123" },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "User logged in successfully" },
        401: { description: "Invalid credentials" },
      },
    },
  },

  "/api/v1/auth/me": {
    get: {
      tags: ["Auth"],
      summary: "Get logged-in user's profile",
      description: "Fetch the authenticated user's profile details.",
      security: [{ AuthorizationToken: [] }],
      responses: {
        200: { description: "Profile data retrieved successfully" },
        401: { description: "Unauthorized" },
      },
    },
  },

  "/api/v1/auth/refresh-token": {
    post: {
      tags: ["Auth"],
      summary: "Refresh JWT token",
      description: "Refresh the access token using a valid refresh token.",
      responses: {
        200: { description: "Token refreshed successfully" },
        401: { description: "Invalid or expired refresh token" },
      },
    },
  },

  "/api/v1/auth/change-password": {
    post: {
      tags: ["Auth"],
      summary: "Change password (authenticated users)",
      security: [{ AuthorizationToken: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["oldPassword", "newPassword"],
              properties: {
                oldPassword: { type: "string", example: "oldPass123" },
                newPassword: { type: "string", example: "newPass456" },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Password changed successfully" },
        400: { description: "Invalid old password or bad request" },
      },
    },
  },

  "/api/v1/auth/forgot-password": {
    post: {
      tags: ["Auth"],
      summary: "Request password reset",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["email"],
              properties: {
                email: { type: "string", example: "user@example.com" },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Password reset link sent to email" },
        404: { description: "User not found" },
      },
    },
  },

  "/api/v1/auth/reset-password": {
    post: {
      tags: ["Auth"],
      summary: "Reset password using token",
      description:
        "Reset the user's password using a valid token sent to their email.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["token", "email", "newPassword"],
              properties: {
                token: { type: "string", example: "eyJhbGciOiJIUz..." },
                email: { type: "string", example: "user@example.com" },
                newPassword: { type: "string", example: "newSecret123" },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Password reset successfully" },
        400: { description: "Invalid or expired token" },
      },
    },
  },

  "/api/v1/auth/verified-account": {
    post: {
      tags: ["Auth"],
      summary: "Verify account using token",
      description: "Verify a user's email account using a verification token.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["token"],
              properties: {
                token: { type: "string", example: "eyJhbGciOiJIUzI1NiIs..." },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Account verified successfully" },
        400: { description: "Invalid or expired token" },
      },
    },
  },

  "/api/v1/auth/new-verification-link": {
    post: {
      tags: ["Auth"],
      summary: "Request a new verification link",
      description: "Send a new verification link to the user's email address.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["email"],
              properties: {
                email: { type: "string", example: "user@example.com" },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Verification link resent successfully" },
        404: { description: "User not found or already verified" },
      },
    },
  },
};
