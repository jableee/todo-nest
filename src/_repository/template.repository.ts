import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TemplateRequestDto } from "src/template/dto/template.request.dto";
import { TemplateDto } from "src/template/dto/template.response.dto";
import { CustomHttpException } from "src/_commons/contants/http-exception.contant";
import { TemplateEntity } from "src/_entities/template.entity";
import { Repository } from "typeorm";

@Injectable()
export class TemplateRepository {
  constructor(@InjectRepository(TemplateEntity) private templateRepository: Repository<TemplateEntity>) {}

  // 템플릿 이름 중복 체크 
  async findTemplateByName(userId: number, name: string): Promise<TemplateEntity> {
    try{
      const template: TemplateEntity = await this.templateRepository.findOne({
        where: { userId: userId, name: name}
      })

      return template
    }catch(error){
      throw new HttpException(
        CustomHttpException['DB_SERVER_ERROR'],
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  // 템플릿 추가 
  async createTemplate(userId: number, name: string): Promise<number> {
    try{
      const template = await this.templateRepository.insert({ userId: userId, name: name})

      return template.identifiers[0].id
    } catch(error) {
      throw new HttpException(
        CustomHttpException['DB_SERVER_ERROR'],
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  //모든 템플릿 리스트 조회
  async findAllTemplates(userId: number): Promise<Array<TemplateDto>> {
    try {
      const templates: Array<TemplateDto> = await this.templateRepository.find({
        where: { userId: userId },
        order: {
          createdAt: 'ASC'
        },
        select: ['id', 'name']
      })

      return templates
    } catch(error) {
      throw new HttpException(
        CustomHttpException['DB_SERVER_ERROR'],
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
  // 템플릿 접근 권한 체크
  async checkTemplateAccess(userId: number, id: number): Promise<TemplateEntity> {
    try {
      const template: TemplateEntity = await this.templateRepository.findOne({
        where: { userId: userId, id: id },
      });
      return template;
    } catch (error) {
      throw new HttpException(
        CustomHttpException['DB_SERVER_ERROR'],
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // 템플릿 수정
  async updateTemplate(id: number, templateRequestDto: TemplateRequestDto): Promise<void> {
    try{
      await this.templateRepository.update(id, templateRequestDto)
    } catch (error) {
      throw new HttpException(
        CustomHttpException['DB_SERVER_ERROR'],
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  //템플릿 삭제
  async deleteTemplate(id: number): Promise<void> {
    try{
      await this.templateRepository.delete(id)
    } catch (error) {
        CustomHttpException['DB_SERVER_ERROR'],
        HttpStatus.INTERNAL_SERVER_ERROR
    }
  }
}