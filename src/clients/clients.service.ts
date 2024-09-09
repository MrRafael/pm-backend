import { Inject, Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { clientsConstants } from './constants';

@Injectable()
export class ClientsService {
  constructor(
    @Inject(clientsConstants.providerName)
    private clientRepository: Repository<Client>,
  ) {}

  create(createClientDto: CreateClientDto) {
    return this.clientRepository.save(createClientDto);
  }

  findAll() {
    return this.clientRepository.find();
  }

  async findOne(id: number) {
    const clients = await this.clientRepository.findBy({ id });
    return clients[0];
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return this.clientRepository.save({ ...updateClientDto, id });
  }

  remove(id: number) {
    return this.clientRepository.delete(id);
  }
}
