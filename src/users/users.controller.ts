import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/auth/roles.decorator';
import { UserExistGuard } from './users.guard';
import { Public } from 'src/auth/public.decorator';
import { CompleteUserDto } from './dto/complete-user.dto copy';
import { ResetUserDto } from './dto/reset-user.dto';
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(Role.Admin)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('/complete')
  @Public()
  complete(@Body() completeUserDto: CompleteUserDto) {
    return this.usersService.complete(completeUserDto);
  }

  @Post('/reset')
  @Public()
  reset(@Body() resetUserDto: ResetUserDto) {
    return this.usersService.reset(resetUserDto);
  }

  @Get('/code/:code')
  @Public()
  findByCode(@Param('code') code: string) {
    return this.usersService.findOneByCode(code);
  }

  @Get()
  @Roles(Role.Admin)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':email')
  @Roles(Role.Worker, Role.Admin)
  findOne(@Param('email') email: string) {
    return this.usersService.findOneByEmail(email);
  }

  @Roles(Role.Worker, Role.Admin)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req,
  ) {
    return this.usersService.update(+id, updateUserDto, req.headers);
  }

  @Patch('deactivate/:id')
  @Roles()
  deactivateActivate(@Param('id') id: string) {
    return this.usersService.deactivate(+id);
  }

  @Delete(':id')
  @UseGuards(UserExistGuard)
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
