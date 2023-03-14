import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CustomHttpException } from "src/_commons/contants/http-exception.contant";
import { TemplateEntity } from "src/_entities/template.entity";
import { Repository } from "typeorm";

@Injectable()
export class TemplateRepository {
  constructor(@InjectRepository(TemplateEntity) private templateRepository: Repository<TemplateEntity>) {}

  // 템플릿 이름 중복 체크 
  async findTemplateByName(userId: number, name: string): Promise<TemplateEntity> {
    try{
      console.log('1234')
      const template: TemplateEntity = await this.templateRepository.findOne({
        where: { userId: userId, name: name}
      })
      console.log('1111')
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
}