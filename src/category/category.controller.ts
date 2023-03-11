import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Token } from "src/_commons/auth/token.decorator";
import { CustomHttpSuccess } from "src/_commons/contants/http-success.contant";
import { UserEntity } from "src/_entities/user.entity";
import { CategoryService } from "./category.service";
import { CategoryRequestDto } from "./dto/category.request.dto";
import { 
  CategoryAddResponseDto, 
  CategoryDeleteResponseDto, 
  CategoryIdDto,
  CategoryListDto,
  CategoryListResponseDto, 
  CategoryUpdateResponseDto
} from "./dto/category.response.dto";

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  /**
   * 카테고리 추가
   * @param user UserEntity
   * @param categoryRequestDto CategoryRequestDto
   * @returns CategoryAddResponseSto
   */
  @Post()
  @UseGuards(AuthGuard())
  async addCategory(
    @Token() user: UserEntity,
    @Body(ValidationPipe) categoryRequestDto: CategoryRequestDto,
  ): Promise<CategoryAddResponseDto> {
    const categoryId: CategoryIdDto = await this.categoryService.addCategory(
      +user.id,
      categoryRequestDto,
    )
    return {
      statusCode: 201, 
      message: CustomHttpSuccess['ADD_CATEGORY_SUCCESS'],
      data: categoryId
    }
  }

  /** 
   * 카테고리 리스트 
   * @param user UserEntity
   * @returns CategoryListResponseDto
   */
  @Get()
  @UseGuards(AuthGuard())
  async getCategories(@Token() user: UserEntity): Promise<CategoryListResponseDto> {
    const categories: CategoryListDto = await this.categoryService.getCategories(+user.id)
    return {
      statusCode: 201,
      message: CustomHttpSuccess['GET_CATEGORIES_SUCCESS'],
      data: categories
    }
  }

  /**
   * 카테고리 수정 
   * @param user UserEntity
   * @param id string
   * @param categoryRequestDto CategoryRequestDto
   * @returns CategoryUpdateResponse
   */
  @Patch(':id')
  @UseGuards(AuthGuard())
  async updateCategory(
    @Token() user: UserEntity,
    @Param('id') id: string,
    @Body(ValidationPipe) categoryRequestDto: CategoryRequestDto,
  ): Promise<CategoryUpdateResponseDto> {
    await this.categoryService.updateCategory(+user.id, +id, categoryRequestDto)

    return {
      statusCode: 200,
      message: CustomHttpSuccess['UPDATE_CATEGORY_SUCCESS']
    }
  }

  /** 
   * 카테고리 삭제
   * @param user UserEntity
   * @param id string
   * @param categoryRequestDto CategoryRequestDto
   * @returns CagegoryDeleteResponseDto 
   */
  @Delete(':id')
  @UseGuards(AuthGuard())
  async deleteCategory(
    @Token() user: UserEntity,
    @Param('id') id: string,
  ): Promise<CategoryDeleteResponseDto> {
    await this.categoryService.deleteCategory(+user.id, +id)

    return {
      statusCode: 200,
      message: CustomHttpSuccess['DELETE_CATEGORY_SUCCESS']
    }
  }
}