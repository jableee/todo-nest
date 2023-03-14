//템플릿 id
export class TemplateIdDto {
  readonly id: number
}

//템플릿 추가
export class TemplateAddResponseDto {
  readonly statusCode: number
  readonly message: string
  readonly data: object
}

//템플릿
export class TemplateDto {
  readonly id: number
  readonly name: string
}

//템플릿 리스트
export class TemplateListDto {
  readonly templates: Array<TemplateDto>
}

//템플릿 리스트 Response 
export class TemplateListResponseDto {
  readonly statusCode: number
  readonly message: string
  readonly data: object
}

//템플릿 수정 Response
export class TemplateUpdateresponseDto {
  readonly statusCode: number
  readonly message: string
}

// 템플릿 삭제 컨트롤러 
export class tempalteDeleteResponseDto {
  readonly statusCode: number
  readonly message: string
}