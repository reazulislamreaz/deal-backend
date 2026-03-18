import path from "path";
import { configs } from "./app/configs";
import { authSwaggerDocs } from "./app/modules/auth/auth.swagger";
import { userSwaggerDocs } from "./app/modules/user/user.swagger";
import { uploadSwaggerDocs } from "./app/modules/upload/upload.swagger";
import { machineSwaggerDocs } from "./app/modules/machine/machine.swagger";
import { investorSwaggerDocs } from "./app/modules/investor/investor.swagger";
import { maintenanceSwaggerDocs } from "./app/modules/maintenance/maintenance.swagger";
import { contactSwaggerDocs } from "./app/modules/contact/contact.swagger";
import { privacySwaggerDocs } from "./app/modules/privacy/privacy.swagger";
import { voteSwaggerDocs } from "./app/modules/vote/vote.swagger";
import { machineRevenueSwaggerDocs } from "./app/modules/machineRevenue/machineRevenue.swagger";

export const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Doc - Build with Express CLI",
      version: "1.0.0-Reaz",
      description: "Express API with auto-generated Swagger docs",
    },
    paths: {
      ...authSwaggerDocs,
      ...userSwaggerDocs,
      ...uploadSwaggerDocs,
      ...machineSwaggerDocs,
      ...investorSwaggerDocs,
      ...maintenanceSwaggerDocs,

      ...contactSwaggerDocs,
      ...privacySwaggerDocs,
      ...voteSwaggerDocs,
      ...machineRevenueSwaggerDocs,
    },
    servers:
      configs.env === "production"
        ? [
            { url: "http://206.162.244.11:5000" },
            { url: "http://206.162.244.11:5000" },
          ]
        : [
            { url: "http://206.162.244.11:5000" },
            { url: "http://206.162.244.11:5000" },
          ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "apiKey",
          in: "header",
          name: "Authorization",
          description: "Put your accessToken here ",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    path.join(
      __dirname,
      configs.env === "production" ? "./**/*.js" : "./**/*.ts",
    ),
  ],
};
