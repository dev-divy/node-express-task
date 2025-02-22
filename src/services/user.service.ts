import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRepository } from '@/repositories/user.repository';
import { UserDto, LoginDto } from '@/types/user';
import { ConflictError, AuthenticationError } from '@/utils/errors';
import { config } from '@/config/index';
import logger from '@/utils/logger';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async register(userDto: UserDto): Promise<void> {
    // Check if username exists
    const existingUser = await this.userRepository.findByUsername(
      userDto.username
    );
    if (existingUser) {
      throw new ConflictError('Username already exists');
    }

    // Check if email exists
    const existingEmail = await this.userRepository.findByEmail(userDto.email);
    if (existingEmail) {
      throw new ConflictError('Email already registered');
    }

    // Hash password
    const salt = await bcrypt.genSalt(config.bcryptSaltRounds);
    const passwordHash = await bcrypt.hash(userDto.password, salt);

    // Create user
    await this.userRepository.create(userDto.username, {
      email: userDto.email,
      type: userDto.type,
      salt,
      passwordHash,
    });

    logger.info(`User registered successfully: ${userDto.username}`);
  }

  public async login(loginDto: LoginDto): Promise<string> {
    // Find user
    const user = await this.userRepository.findByUsername(loginDto.username);
    if (!user) {
      throw new AuthenticationError('Invalid credentials');
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(
      loginDto.password,
      user.passwordHash
    );
    if (!isValidPassword) {
      throw new AuthenticationError('Invalid credentials');
    }

    // Generate JWT token
    const token = jwt.sign(
      { username: loginDto.username, type: user.type },
      config.jwtSecret,
      { expiresIn: '1h' }
    );

    logger.info(`User logged in successfully: ${loginDto.username}`);
    return token;
  }
}
