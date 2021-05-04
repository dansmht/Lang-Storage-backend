import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDetails } from '../../utils/types';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() userDetails: UserDetails) {
    return this.usersService.create(userDetails);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') googleId: string) {
    return this.usersService.findByGoogleId(googleId);
  }

  @Patch(':id')
  update(
    @Param('id') googleId: string,
    @Body() userDetails: Partial<UserDetails>,
  ) {
    return this.usersService.update(googleId, userDetails);
  }

  @Delete(':id')
  remove(@Param('id') googleId: string) {
    return this.usersService.remove(googleId);
  }
}
