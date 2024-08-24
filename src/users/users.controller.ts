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
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  create(@Body() createUserDto: CreateUserDto, @Request() req) {
    return this.usersService.create(createUserDto, req.headers);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':email')
  @UseInterceptors(ClassSerializerInterceptor)
  findOne(@Param('email') email: string) {
    return this.usersService.findOne(email);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req,
  ) {
    return this.usersService.update(+id, updateUserDto, req.headers);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('deactivate/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  deactivateActivate(@Param('id') id: string, @Request() req) {
    return this.usersService.deactivate(+id, req.headers);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  remove(@Param('id') id: string, @Request() req) {
    return this.usersService.remove(+id, req.headers);
  }
}
