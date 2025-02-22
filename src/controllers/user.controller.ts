import { Request, Response, NextFunction } from 'express';
import { UserService } from '@/services/user.service';
import { userSchema, loginSchema } from '@/validation/user.schema';
import { ValidationError } from '@/utils/errors';
import { UserDto, LoginDto } from '@/types/user';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate request body
      const { error, value } = userSchema.validate(req.body);
      if (error) {
        throw new ValidationError(error.details[0].message);
      }

      // Register user
      await this.userService.register(value as UserDto);

      res.status(201).json({
        status: 'success',
        message: 'User registered successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate request body
      const { error, value } = loginSchema.validate(req.body);
      if (error) {
        throw new ValidationError(error.details[0].message);
      }

      // Login user and get token
      const token = await this.userService.login(value as LoginDto);

      res.json({
        status: 'success',
        data: {
          token,
          type: 'Bearer',
        },
      });
    } catch (error) {
      next(error);
    }
  };
}
