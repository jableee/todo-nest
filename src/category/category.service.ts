import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CustomHttpException } from "src/_commons/contants/http-exception.contant";
import { CategoryEntity } from "src/_entities/category.entity";
import { CategoryRepository } from "src/_repository/category.repository";
import { CategoryRequestDto } from "./dto/category.request.dto";
import { CategoryIdDto } from "./dto/category.response.dto";


@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}
  /** 
   * @param userId number
   * @param categoryRequestDto CategoryRequestDto
   * @returns IdDto
   */
  async addCategory(
    userId: number,
    categoryRequestDto: CategoryRequestDto,
  ): Promise<CategoryIdDto> {
    const name: string = categoryRequestDto['name']

    //카테고리 이름 중복 체크
    const categoryName: CategoryEntity = await this.categoryRepository.findCategoryByName(
      userId,
      name,
    )
    if(categoryName) {
      throw new HttpException(CustomHttpException['CONFLICT_CATEGORY'],HttpStatus.CONFLICT)
    }

    const categoryId: number = await this.categoryRepository.createCategory(userId, name)
    return { id: categoryId}
  }
}