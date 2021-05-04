import { User } from '../models/users/entities/user.entity';

export type UserDetails = {
  googleId: string;
  displayName: string;
  firstName: string;
  lastName: string;
  email: string;
  picture: string | undefined;
};

export type Done = (err: Error, user: User) => void;
