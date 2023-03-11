import { Body, Controller, Post, UseGuards, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Token } from "src/_commons/auth/token.decorator";
import { CustomHttpSuccess } from "src/_commons/contants/http-success.contant";
import { UserEntity } from "src/_entities/user.entity";
import { TodoRequestDto } from "./dto/todo.request.dto";
import { TodoAddResponseDto, TodoIdDto } from "./dto/todo.response.dto";
import { TodoService } from "./todo.service";

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  /** 
   * Todo추가
   * @param user UserEntity
   * @param todoRequestDto TodoReqeustDto
   * @returns TodoAddResponseDto
   */
  @Post()
  @UseGuards(AuthGuard())
  async addTodo(
    @Token() user: UserEntity,
    @Body(ValidationPipe) todoRequestDto: TodoRequestDto,
  ): Promise<TodoAddResponseDto> {
    const todoId: TodoIdDto = await this.todoService.addTodo(+user.id, todoRequestDto)
    return {
      statusCode: 201, 
      message: CustomHttpSuccess['ADD_TODO_SUCCESS'],
      data: todoId
    }
  }
}