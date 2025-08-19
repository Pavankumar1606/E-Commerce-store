// swagger.js
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-Commerce API",
      version: "1.0.0",
      description: "API documentation for the Node.js E-Commerce project",
    },
    servers: [
      {
        url: "http://localhost:5000", // adjust if your server runs elsewhere
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./backend/routes/*.js"], // if running from project root
 // adjust path if needed
};

const swaggerSpec = swaggerJsdoc(options);

export function swaggerDocs(app, port) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  console.log(`📚 Swagger Docs available at http://localhost:${port}/api-docs`);
}
