import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class UserExistGuard implements CanActivate {
  constructor(private userService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { params } = context.switchToHttp().getRequest();

    if (!params?.id) {
      throw new BadRequestException();
    }

    const user = await this.userService.findOne(params?.id);

    if (!user) {
      throw new BadRequestException();
    }

    return !!user;
  }
}
