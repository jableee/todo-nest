import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryEntity } from "src/_entities/category.entity";
import { TodoEntity } from "src/_entities/todo.entity";
import { CategoryRepository } from "src/_repository/category.repository";
import { TodoRepository } from "src/_repository/todo.repository";
import { TodoController } from "./todo.controller";
import { TodoService } from "./todo.service";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([TodoEntity, CategoryEntity]),
  ],
  controllers: [TodoController],
  providers: [TodoRepository, TodoService, CategoryRepository, CategoryEntity]
})

export class TodoModule {}