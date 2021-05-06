import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Profile, Strategy } from 'passport-google-oauth20';

import { AuthService } from '../auth.service';
import { UserDetails } from '../../utils/types';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {
    super({
      clientID: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get('GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { id: googleId, name, displayName, emails, photos } = profile;
    const user = {
      googleId,
      displayName,
      firstName: name.givenName,
      lastName: name.familyName,
      email: emails[0].value,
      picture: photos[0]?.value,
    } as UserDetails;
    return this.authService.validateUser(user);
  }
}
