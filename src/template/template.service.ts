import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CustomHttpException } from "src/_commons/contants/http-exception.contant";
import { TemplateEntity } from "src/_entities/template.entity";
import { TemplateRepository } from "src/_repository/template.repository";
import { TemplateRequestDto } from "./dto/template.request.dto";
import { TemplateIdDto } from "./dto/template.response.dto";

@Injectable()
export class TemplateService {
  constructor(private templateRepository: TemplateRepository) {}

  /**
   * 템플릿 추가
   * @param userId number 
   * @param templateRequestDto TemplateRequestDto
   * @returns TemplateIdDto
   */
  async addTemplate(
    userId: number,
    templateRequestDto: TemplateRequestDto
  ): Promise<TemplateIdDto> {
    const name: string = templateRequestDto['name']

    //템플릿 이름 중복 체크
    const templateName: TemplateEntity = await this.templateRepository.findTemplateByName(
      userId, 
      name
    )
    if(templateName) {
      throw new HttpException(CustomHttpException['CONFLICT_TEMPLATE'], HttpStatus.CONFLICT)
    }

    const templateId: number = await this.templateRepository.createTemplate(userId, name)
    return { id: templateId }
  }
}