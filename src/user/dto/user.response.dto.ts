//AccessToken
export class AccessTokenDto {
  readonly accessToken: string
}

//회원가입 
export class SignupResponseDto {
  readonly statusCode: number
  readonly message: string
  readonly data: object
}

//로그인 Response
export class SigninResponseDto {
  readonly statusCode: number
  readonly message: string
  readonly data: object
}

//이메일 
export class EmailDto {
  readonly email: string
}

//내 정보보기 Response
export class MeResponseDto {
  readonly statusCode: number
  readonly message: string
  readonly data: object
}