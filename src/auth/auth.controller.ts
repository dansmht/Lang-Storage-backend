import {
  Controller,
  Get,
  Req,
  Post,
  Redirect,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';

import { AuthenticatedGuard, GoogleAuthGuard } from './guards';

@Controller('auth')
export class AuthController {
  @Get('login')
  @UseGuards(GoogleAuthGuard)
  login() {
    return;
  }

  @Redirect('http://localhost:3001/')
  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  redirect() {
    return;
  }

  @Get('status')
  @UseGuards(AuthenticatedGuard)
  status(@Req() req: Request) {
    return req.user;
  }

  @Post('logout')
  @UseGuards(AuthenticatedGuard)
  logout(@Req() req: Request) {
    req.logOut();
    req.session.destroy((err) => {
      return err;
    });
  }
}
