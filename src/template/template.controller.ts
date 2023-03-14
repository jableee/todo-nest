import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Token } from "src/_commons/auth/token.decorator";
import { TemplateRequestDto } from "./dto/template.request.dto";
import { TemplateService } from "./template.service";
import { tempalteDeleteResponseDto, TemplateAddResponseDto, TemplateIdDto, TemplateListDto, TemplateListResponseDto, TemplateUpdateresponseDto } from './dto/template.response.dto'
import { UserEntity } from "src/_entities/user.entity";
import { CustomHttpSuccess } from "src/_commons/contants/http-success.contant";

@Controller('templates')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  /**
   * 템플릿 추가
   * @param user UserEntity
   * @param templateRequestDto TemplateRequesetDto
   * @returns TemplateAddResponseDto
   */
  @Post()
  @UseGuards(AuthGuard())
  async addTemplate(
    @Token() user: UserEntity,
    @Body(ValidationPipe) templateRequestDto: TemplateRequestDto,
  ): Promise<TemplateAddResponseDto> {
    const templateId: TemplateIdDto = await this.templateService.addTemplate(
      +user.id,
      templateRequestDto
    )
    return {
      statusCode: 201,
      message: CustomHttpSuccess['ADD_TEMPLATE_SUCCESS'],
      data: templateId
    }
  }

  @Get()
  @UseGuards(AuthGuard())
  async getTemplates(@Token() user: UserEntity): Promise<TemplateListResponseDto> {
    const templates: TemplateListDto = await this.templateService.getTemplates(+user.id)
    return {
      statusCode: 200,
      message: CustomHttpSuccess['GET_TEMPLATES_SUCCESS'],
      data: templates
    }
  }

  /**
   * 템플릿 수정 
   * @param user UserEntity
   * @param id string 
   * @param templateRequestDto TemplateRequestDto
   * @returns TemplateUpdateresponseDto
   */
  @Patch(':id')
  @UseGuards(AuthGuard())
  async updateTemplate(
    @Token() user: UserEntity,
    @Param('id') id: string,
    @Body(ValidationPipe) templateRequestDto: TemplateRequestDto,
  ): Promise<TemplateUpdateresponseDto> {
    await this.templateService.updateTemplate(+user.id, +id, templateRequestDto)
    return {
      statusCode: 200,
      message: CustomHttpSuccess['UPDATE_CATEGORY_SUCCESS']
    }
  }

  /**
   * 템플릿 삭제
   * @param user UserEntity
   * @param id string 
   * @returns TemplateDeleteResponseDto
   */
  @Delete(':id')
  @UseGuards(AuthGuard())
  async deleteTemplate(
    @Token() user: UserEntity,
    @Param('id') id: string,
  ): Promise<tempalteDeleteResponseDto> {
    await this.templateService.deleteTemplate(+user.id, +id)
    return {
      statusCode: 200,
      message: CustomHttpSuccess['DELETE_TEMPLATE_SUCCESS']
    }
  }
}