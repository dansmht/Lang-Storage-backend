import { Injectable } from '@nestjs/common';

import { UsersService } from '../models/users/users.service';
import { UserDetails } from '../utils/types';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(details: UserDetails) {
    return await this.usersService.findAndUpdateOrCreate(details);
  }
}
