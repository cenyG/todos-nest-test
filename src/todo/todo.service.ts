import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Todo } from './todo.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CrudRequest } from '@nestjsx/crud';

@Injectable()
export class TodoService extends TypeOrmCrudService<Todo> {
  recoverOne(req: CrudRequest): Promise<Todo> {
    throw new Error('Method not implemented.');
  }
  constructor(@InjectRepository(Todo) repo) {
    super(repo);
  }
}
