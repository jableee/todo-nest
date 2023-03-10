import { Module } from "@nestjs/common";
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CategoryEntity } from '../_entities/category.entity'
import { CategoryController } from './category.controller'
import { CategoryService } from "./category.service";
import { CategoryRepository } from '../_repository/category.repository'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([CategoryEntity])
  ],
  controllers: [CategoryController],
  providers: [CategoryRepository, CategoryService]
})

export class CategoryModule {}