import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CustomHttpException } from "src/_commons/contants/http-exception.contant";
import { CustomHttpSuccess } from "src/_commons/contants/http-success.contant";
import { CategoryEntity } from "src/_entities/category.entity";
import { CategoryRepository } from "src/_repository/category.repository";
import { CategoryRequestDto } from "./dto/category.request.dto";
import { 
  CategoryIdDto,
  CategoryDto,
  CategoryListDto 
} from "./dto/category.response.dto";


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

  /**
   * 카테고리 리스트
   * @param userId number
   * @returns CategoryListDto
   */
  async getCategories(userId: number): Promise<CategoryListDto> {
    const categories: Array<CategoryDto> = await this.categoryRepository.findAllCategories(userId)
    return { categories }
  }

  /** 
   * 카테고리 수정 
   * @param userId number
   * @param id number
   * @param categoryRequestDto CategoryRequestDto
   * @returns 
   */
  async updateCategory(
    userId: number,
    id: number,
    categoryRequestDto: CategoryRequestDto,
  ): Promise<void> {
    //카테고리 접근 권한 체크
    const categoryAccess: CategoryEntity = await this.categoryRepository.checkCategoryAccess(
      userId,
      id,
    )
    if(!categoryAccess){
      throw new HttpException(CustomHttpException['FORBIDDEN_CATEGORY'], HttpStatus.FORBIDDEN)
    }

    // 카테고리 이름 중복 체크
    const name: string = categoryRequestDto['name']
    const categoryname: CategoryEntity = await this.categoryRepository.findCategoryByName(
      userId,
      name,
    )
    if(categoryname) {
      throw new HttpException(CustomHttpException['CONFLICT_CATEGORY'], HttpStatus.CONFLICT)
    }

    await this.categoryRepository.updateCategory(id, categoryRequestDto)
  }

  /** 
   * 카테고리 삭제
   * @param userId number
   * @param id number
   * @returns
   */
  async deleteCategory(userId: number, id: number): Promise<void> {
    //카테고리 접근 권한 체크
    const categoryAccess: CategoryEntity = await this.categoryRepository.checkCategoryAccess(
      userId,
      id,
    )
    if(!categoryAccess){
      throw new HttpException(CustomHttpException['FORBIDDEN_CATEGORY'], HttpStatus.FORBIDDEN)
    }

    await this.categoryRepository.deleteCategory(id)
  }
}