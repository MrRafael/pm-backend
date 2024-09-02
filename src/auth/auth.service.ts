import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      return null;
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (user && isMatch && user.isActive) {
      //avoid to return password
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, {
        secret: this.configService.get<string>('jwt.refreshSecret'),
        expiresIn: this.configService.get<string>('jwt.refreshDuration'),
      }),
      role: user.roles,
      email: user.email,
    };
  }

  async refresh(headers: any) {
    const token = headers.authorization?.split(' ')[1];

    if (!token) {
      throw new NotFoundException('User not found');
    }

    const decoded = this.jwtService.decode(token);
    const payload = { username: decoded.username, sub: decoded.sub };

    const user = await this.usersService.findOneByEmail(payload.username);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    try {
      this.jwtService.verify(token, {
        secret: this.configService.get<string>('jwt.refreshSecret'),
      });
      return {
        access_token: this.jwtService.sign(payload),
        refresh_token: this.jwtService.sign(payload, {
          secret: this.configService.get<string>('jwt.refreshSecret'),
          expiresIn: this.configService.get<string>('jwt.refreshDuration'),
        }),
        role: user.roles,
        email: user.email,
      };
    } catch (err) {
      if (err.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Invalid signature');
      }
      if (err.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token Expired');
      }
      throw new UnauthorizedException(err.name);
    }
  }

  async verify(token: any) {
    return {
      isValid: this.jwtService.verify(token),
    };
  }
}
