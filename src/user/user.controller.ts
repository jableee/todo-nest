import { Controller, Body, Post, Get, ValidationPipe, HttpCode, UseGuards } from "@nestjs/common";
import { CustomHttpSuccess } from '../_commons/contants/http-success.contant'
import { UserEntity } from "src/_entities/user.entity";
import { UserService } from 'src/user/user.service'
import { SignupRequestDto, SigninRequestDto } from "./dto/user.request.dto";
import { AccessTokenDto, MeResponseDto, SignupResponseDto, SigninResponseDto } from "./dto/user.response.dto";
import { AuthGuard } from "@nestjs/passport";
import { Token } from "src/_commons/auth/token.decorator";

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  
  /**
   * 회원가입
   *  @param signupRequestDto SignupRequestDto
   *  @returns SignupResponseDto
   */
  @Post('/signup')
  async signup(
    @Body(ValidationPipe) signupRequestDto: SignupRequestDto,
  ): Promise<SignupResponseDto> {
    const accessToken: AccessTokenDto = await this.userService.signup(signupRequestDto)
    return {
      statusCode: 201, 
      message: CustomHttpSuccess['SIGNUP_SUCCESS'],
      data: accessToken
    }
  }

  /**
   * 로그인
   * @param signinRequestDto SigninRequestDto
   * @return SigninResponseDto
   */
  @HttpCode(200)
  @Post('/signin')
  async signin(
    @Body(ValidationPipe) signinRequestDto: SigninRequestDto,
  ): Promise<SigninResponseDto> {
    const accessToken = await this.userService.signin(signinRequestDto)
    return {
      statusCode: 200,
      message: CustomHttpSuccess['SIGNIN_SUCCESS'],
      data: accessToken
    }
  }

  /**
   * @param user UserEntity
   * @returns MeResponseDto
   */
  @Get('/me')
  @UseGuards(AuthGuard())
  async getMyInfo(@Token() user: UserEntity): Promise<MeResponseDto> {
    const email = await this.userService.getMyInfo(user)
    return {
      statusCode: 200,
      message: CustomHttpSuccess['GET_MY_INFO_SUCCESS'],
      data: email
    }
  }
}