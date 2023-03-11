//ToDo 아이디
export class TodoIdDto {
  readonly id: number
}

//ToDo 추가 Response
export class TodoAddResponseDto {
  readonly statusCode: number
  readonly message: string
  readonly data: object
}