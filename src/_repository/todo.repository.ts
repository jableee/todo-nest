import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TodoRequestDto } from "src/todo/dto/todo.request.dto";
import { CustomHttpException } from "src/_commons/contants/http-exception.contant";
import { TodoEntity } from "src/_entities/todo.entity";
import { Repository } from "typeorm";

@Injectable()
export class TodoRepository{
  constructor(@InjectRepository(TodoEntity) private todoRepository: Repository<TodoEntity>) {}

  // Todo 추가
  async createTodo(todoRequestDto: TodoRequestDto): Promise<number> {
    try {
      const todoId = await this.todoRepository.insert(todoRequestDto)
      return todoId.identifiers[0].id
    } catch(error) {
      throw new HttpException(
        CustomHttpException['DB_SERVER_ERROR'],
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }
}