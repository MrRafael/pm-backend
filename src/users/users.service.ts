import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Not, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { usersConstants } from './constants';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @Inject(usersConstants.providerName)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto, headers: any) {
    const token = headers.authorization?.split(' ')[1];

    const decoded = this.jwtService.decode(token);

    const creator = await this.findOne(decoded.username);

    if (creator.role === 'worker') {
      throw new BadRequestException('Não pode criar usuários.');
    }

    const userSaved = await this.findOne(createUserDto.email);

    if (userSaved) {
      throw new BadRequestException('Email ja cadastrado');
    }

    const user = new User();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.password = createUserDto.password;

    return this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find({ where: { role: Not('superAdmin') } });
  }

  async findOne(email: string) {
    const users = await this.userRepository.find({ where: { email } });
    return users[0];
  }

  async update(id: number, updateUserDto: UpdateUserDto, headers: any) {
    const token = headers.authorization?.split(' ')[1];

    const decoded = this.jwtService.decode(token);
    const creator = await this.findOne(decoded.username);

    if (creator.role === 'worker') {
      throw new BadRequestException('Não pode alterar usuários.');
    }

    const userSaved = await this.userRepository.findOneBy({ id });

    if (!userSaved) {
      throw new BadRequestException('Usuario não existe.');
    }

    if (
      userSaved?.role !== 'worker' &&
      userSaved.id !== creator.id &&
      creator.role !== 'superAdmin'
    ) {
      throw new BadRequestException('Email não pode ser alterado.');
    }

    userSaved.name = updateUserDto.name;
    userSaved.role = updateUserDto.role;

    if (userSaved.email !== updateUserDto.email) {
      const emailToSave = await this.findOne(updateUserDto.email);
      if (emailToSave)
        throw new BadRequestException('Email ja pode cadastrado');

      userSaved.email = updateUserDto.email;
    }

    if (updateUserDto.password) {
      userSaved.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    return this.userRepository.save(userSaved);
  }

  async deactivate(id: number, headers: any) {
    const token = headers.authorization?.split(' ')[1];

    const decoded = this.jwtService.decode(token);
    const creator = await this.findOne(decoded.username);

    if (creator.role !== 'superAdmin') {
      throw new BadRequestException('Não pode alterar usuários.');
    }

    const userSaved = await this.userRepository.findOneBy({ id });

    if (!userSaved) {
      throw new BadRequestException('Usuario não existe.');
    }

    userSaved.isActive = !userSaved.isActive;

    return this.userRepository.save(userSaved);
  }

  async remove(id: number, headers: any) {
    const token = headers.authorization?.split(' ')[1];

    const decoded = this.jwtService.decode(token);
    const creator = await this.findOne(decoded.username);

    if (creator.role === 'worker') {
      throw new BadRequestException('Não pode deletar usuários.');
    }

    const userSaved = await this.userRepository.findOneBy({ id });

    if (
      userSaved?.role !== 'worker' &&
      userSaved.id !== creator.id &&
      creator.role !== 'superAdmin'
    ) {
      throw new BadRequestException('Email não pode ser deletado.');
    }

    return this.userRepository.delete(id);
  }
}
