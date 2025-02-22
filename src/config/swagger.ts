import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User Authentication API',
      version: '1.0.0',
      description: 'API documentation for user authentication service',
    },
    servers: [
      {
        url: 'https://zp1v56uxy8rdx5ypatb0ockcb9tr6a-oci3--3000--7f809d15.local-credentialless.webcontainer-api.io',
        description: 'stackblitz server',
      },
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        UserRegistration: {
          type: 'object',
          required: ['username', 'email', 'password', 'type'],
          properties: {
            username: {
              type: 'string',
              description: "User's username",
              example: 'johndoe',
            },
            email: {
              type: 'string',
              format: 'email',
              description: "User's email address",
              example: 'john@example.com',
            },
            password: {
              type: 'string',
              description:
                "User's password (min 5 chars, must contain uppercase, lowercase, and special char)",
              example: 'Test123!',
            },
            type: {
              type: 'string',
              enum: ['user', 'admin'],
              description: "User's role type",
              example: 'user',
            },
          },
        },
        UserLogin: {
          type: 'object',
          required: ['username', 'password'],
          properties: {
            username: {
              type: 'string',
              description: "User's username",
              example: 'johndoe',
            },
            password: {
              type: 'string',
              description: "User's password",
              example: 'Test123!',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              example: 'error',
            },
            message: {
              type: 'string',
              example: 'Error message',
            },
          },
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'], // Path to the API routes
};

export const specs = swaggerJsdoc(options);
