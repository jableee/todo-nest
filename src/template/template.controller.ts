import { Body, Controller, Post, UseGuards, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Token } from "src/_commons/auth/token.decorator";
import { TemplateRequestDto } from "./dto/template.request.dto";
import { TemplateService } from "./template.service";
import { TemplateAddResponseDto, TemplateIdDto } from './dto/template.response.dto'
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
}