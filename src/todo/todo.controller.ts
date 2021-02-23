import { Controller } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.entity';
import { Crud } from '@nestjsx/crud';

@Crud({
  model: {
    type: Todo,
  },
})
@Controller('todos')
export class TodoController {
  constructor(private readonly service: TodoService) {}
}
