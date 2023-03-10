import { Body, Controller, Post, UseGuards, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Token } from "src/_commons/auth/token.decorator";
import { CustomHttpSuccess } from "src/_commons/contants/http-success.contant";
import { UserEntity } from "src/_entities/user.entity";
import { CategoryService } from "./category.service";
import { CategoryRequestDto } from "./dto/category.request.dto";
import { CategoryAddResponseDto, CategoryIdDto } from "./dto/category.response.dto";

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  /**
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
}