import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { AuthService } from '../auth.service';
import { User } from '../../models/users/entities/user.entity';
import { Done, UserDetails } from '../../utils/types';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly authService: AuthService) {
    super();
  }

  serializeUser(user: User, done: Done) {
    done(null, user);
  }

  async deserializeUser(user: User, done: Done) {
    const { id, ...userDetails } = user;
    const userDB = await this.authService.validateUser(
      userDetails as UserDetails,
    );
    return userDB ? done(null, userDB) : done(null, null);
  }
}
