import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { CreateProjectNoteDto } from './dto/create-project-note.dto';
import { projectNotesConstants } from './constants';
import { ProjectNote } from './entities/project-note.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ProjectNoteService {
  constructor(
    @Inject(projectNotesConstants.providerName)
    private projectNotesRepository: Repository<ProjectNote>,
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async create(createProjectNoteDto: CreateProjectNoteDto, headers: any) {
    const token = headers.authorization?.split(' ')[1];

    const decoded = this.jwtService.decode(token);

    const user = await this.userService.findOneByEmail(decoded.username);

    const note = new ProjectNote(createProjectNoteDto);
    note.user = user;
    return this.projectNotesRepository.save(note);
  }

  findAll() {
    return this.projectNotesRepository.find();
  }

  async remove(id: number, headers: any) {
    const token = headers.authorization?.split(' ')[1];

    const decoded = this.jwtService.decode(token);

    const notes = await this.projectNotesRepository.find({
      where: { id },
      relations: { user: true },
    });

    if (notes[0]?.user.email !== decoded.username) {
      throw new ForbiddenException();
    }

    return this.projectNotesRepository.delete(id);
  }
}
