import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Not, Repository, ArrayContains } from 'typeorm';
import { User } from './entities/user.entity';
import { usersConstants } from './constants';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/enums/role.enum';

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

    if (creator.roles.includes(Role.Worker)) {
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
    return this.userRepository.find({
      where: { roles: Not(ArrayContains([Role.SuperAdmin])) },
    });
  }

  async findOne(email: string) {
    const users = await this.userRepository.find({ where: { email } });
    return users[0];
  }

  async update(id: number, updateUserDto: UpdateUserDto, headers: any) {
    const token = headers.authorization?.split(' ')[1];

    const decoded = this.jwtService.decode(token);
    const creator = await this.findOne(decoded.username);

    if (creator.roles.includes(Role.Worker)) {
      throw new BadRequestException('Não pode alterar usuários.');
    }

    const userSaved = await this.userRepository.findOneBy({ id });

    if (!userSaved) {
      throw new BadRequestException('Usuario não existe.');
    }

    if (
      !userSaved?.roles.includes(Role.Worker) &&
      userSaved.id !== creator.id &&
      !creator.roles.includes(Role.SuperAdmin)
    ) {
      throw new BadRequestException('Email não pode ser alterado.');
    }

    userSaved.name = updateUserDto.name;
    userSaved.roles = updateUserDto.roles;

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

    if (creator.roles.includes(Role.SuperAdmin)) {
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

    if (creator.roles.includes(Role.Worker)) {
      throw new BadRequestException('Não pode deletar usuários.');
    }

    const userSaved = await this.userRepository.findOneBy({ id });

    if (
      !userSaved?.roles.includes(Role.Worker) &&
      userSaved.id !== creator.id &&
      !creator.roles.includes(Role.SuperAdmin)
    ) {
      throw new BadRequestException('Email não pode ser deletado.');
    }

    return this.userRepository.delete(id);
  }
}
