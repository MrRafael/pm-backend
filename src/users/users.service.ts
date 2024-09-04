import { Inject, Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Not, Repository, ArrayContains } from 'typeorm';
import { User } from './entities/user.entity';
import { usersConstants } from './constants';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/enums/role.enum';
import { v4 as uuidv4 } from 'uuid';
import { CompleteUserDto } from './dto/complete-user.dto copy';
import { ResetUserDto } from './dto/reset-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(usersConstants.providerName)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userSaved = await this.findOneByEmail(createUserDto.email);

    if (userSaved) {
      throw new BadRequestException();
    }

    const user = new User();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.accessCode = uuidv4();

    return this.userRepository.save(user);
    //TODO: Need to send email
  }

  async complete(completeUserDto: CompleteUserDto) {
    const usersSaved = await this.userRepository.findBy({
      accessCode: completeUserDto.accessCode,
    });

    const userSaved = usersSaved[0];

    if (!userSaved) {
      throw new NotFoundException();
    }

    if (userSaved.isComplete && userSaved.changePassLimit < new Date())
      throw new NotFoundException();

    userSaved.password = await bcrypt.hash(completeUserDto.password, 10);
    userSaved.accessCode = null;
    userSaved.changePassLimit = null;
    userSaved.isComplete = true;

    return this.userRepository.save(userSaved);
  }

  async reset(resetUserDto: ResetUserDto) {
    const userSaved = await this.findOneByEmail(resetUserDto.email);

    if (!userSaved) {
      throw new NotFoundException();
    }

    userSaved.accessCode = uuidv4();
    userSaved.changePassLimit = new Date(Date.now() + 15 * 60000);

    return this.userRepository.save(userSaved);
    //TODO: send email
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find({
      where: { roles: Not(ArrayContains([Role.SuperAdmin])) },
    });
  }

  async findOneByEmail(email: string) {
    const users = await this.userRepository.find({ where: { email } });
    return users[0];
  }

  async findOneByCode(code: string) {
    if (!code) {
      throw new BadRequestException();
    }

    const users = await this.userRepository.find({
      where: { accessCode: code },
    });
    return users[0];
  }

  async findOne(id: number) {
    const users = await this.userRepository.find({ where: { id } });
    return users[0];
  }

  async update(id: number, updateUserDto: UpdateUserDto, headers: any) {
    const token = headers.authorization?.split(' ')[1];

    const decoded = this.jwtService.decode(token);
    const creator = await this.findOneByEmail(decoded.username);

    const userSaved = await this.findOne(id);

    if (!userSaved) {
      throw new BadRequestException();
    }

    if (userSaved.id !== creator.id) {
      throw new BadRequestException('Email não pode ser alterado.');
    }

    userSaved.name = updateUserDto.name;
    userSaved.roles = updateUserDto.roles;

    if (userSaved.email !== updateUserDto.email) {
      const emailToSave = await this.findOneByEmail(updateUserDto.email);
      if (emailToSave)
        throw new BadRequestException('Email ja pode cadastrado');

      userSaved.email = updateUserDto.email;
    }

    // if (updateUserDto.password) {
    //   userSaved.password = await bcrypt.hash(updateUserDto.password, 10);
    // }

    return this.userRepository.save(userSaved);
  }

  async deactivate(id: number) {
    const userSaved = await this.findOne(id);

    if (!userSaved) {
      throw new BadRequestException();
    }

    userSaved.isActive = !userSaved.isActive;

    return this.userRepository.save(userSaved);
  }

  async remove(id: number) {
    return this.userRepository.delete(id);
  }
}
