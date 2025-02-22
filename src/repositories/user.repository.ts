import { UserEntry } from '@/types/user';

// In-memory database mock
const MEMORY_DB: Record<string, UserEntry> = {};

export class UserRepository {
  public async findByUsername(
    username: string
  ): Promise<UserEntry | undefined> {
    return MEMORY_DB[username];
  }

  public async findByEmail(email: string): Promise<UserEntry | undefined> {
    return Object.values(MEMORY_DB).find((user) => user.email === email);
  }

  public async create(username: string, user: UserEntry): Promise<void> {
    MEMORY_DB[username] = user;
  }
}
