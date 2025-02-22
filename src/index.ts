import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import { config } from '@/config/index';
import { specs } from '@/config/swagger';
import { errorHandler } from '@/middleware/error.middleware';
import userRoutes from '@/routes/user.routes';
import logger from '@/utils/logger';

const app = express();

// Security middleware with Swagger UI exceptions
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'https:'],
      },
    },
  })
);

const corsOptions = {
  origin: '*',
  methods: '*',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());

// Trust first proxy for rate limiter
app.set('trust proxy', 1);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    return req.ip || (req.headers['x-forwarded-for'] as string) || '127.0.0.1';
  },
});

// Apply rate limiting to all routes
app.use(limiter);

// Swagger documentation
app.use('/', swaggerUi.serve);
app.get(
  '/',
  swaggerUi.setup(specs, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'User Authentication API Documentation',
    swaggerOptions: {
      persistAuthorization: true,
    },
  })
);

// Routes
app.use('/api/users', userRoutes);

// Error handling
app.use(errorHandler);

app.listen(config.port, () => {
  logger.info(`Server running on port ${config.port}`);
  logger.info(
    `API Documentation available at http://localhost:${config.port}/`
  );
});

// CODE HERE
//
// I want to be able to register a new unique user (username and password). After the user is created I
// should be able to login with my username and password. If a user register request is invalid a 400 error
// should be returned, if the user is already registered a conflict error should be returned.
// On login the users crendentials should be verified.
// Because we dont have a database in this environment we store the users in memory. Fill the helper functions
// to query the memory db.

// Request body -> UserDto
// app.get('/register', (req: Request, res: Response) => {
// Validate user object using joi
// - username (required, min 3, max 24 characters)
// - email (required, valid email address)
// - type (required, select dropdown with either 'user' or 'admin')
// - password (required, min 5, max 24 characters, upper and lower case, at least one special character)
// });

// Request body -> { username: string, password: string }
// app.post('/login', (req: Request, res: Response) => {
//  Return 200 if username and password match
//  Return 401 else
// });
