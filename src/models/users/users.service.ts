import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { UserDetails } from '../../utils/types';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  create(userDetails: UserDetails) {
    const user = this.usersRepository.create(userDetails);
    return this.usersRepository.save(user);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findByGoogleId(googleId: string) {
    return this.usersRepository.findOne({ googleId });
  }

  async update(googleId: string, userDetails: Partial<UserDetails>) {
    const user = await this.findByGoogleId(googleId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updated = Object.assign(user, userDetails);
    return await this.usersRepository.save(updated);
  }

  async findAndUpdateOrCreate(userDetails: UserDetails): Promise<User> {
    const { googleId, ...restDetails } = userDetails;

    const user = await this.findByGoogleId(googleId);

    if (!user) {
      return await this.create(userDetails);
    }

    const hasUserChanges = !Object.keys(restDetails).every(
      (key) => restDetails[key] === user[key],
    );
    if (hasUserChanges) {
      return await this.update(googleId, restDetails);
    }

    return user;
  }

  async remove(googleId: string) {
    const user = await this.findByGoogleId(googleId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.usersRepository.remove(user);
  }
}
