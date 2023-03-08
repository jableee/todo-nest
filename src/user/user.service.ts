import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CustomHttpException } from "src/_commons/contants/http-exception.contant";
import { UserEntity } from "src/_entities/user.entity";
import { UserRepository } from "../_repository/user.repository";
import { SignupRequestDto, SigninRequestDto } from "./dto/user.request.dto";
import { AccessTokenDto, EmailDto } from "./dto/user.response.dto";
import * as bcrypt from 'bcryptjs'
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService {
  // constructor(@InjectRepository(UserEntity) private userRepository: UserRepository, private jwtService: JwtService) {} 
  // @InjectRepository(UserEntity)를 하면 뒤에 private userRepository: UserRepository,가 있더라도 userRepository를 할때 리포지토리를 참조하는게 아니라 엔티티를 참조해서 아해의 findbyEmail에서 typeerror가 발생한다 
  constructor(private userRepository: UserRepository, private jwtService: JwtService) {}
  /**
   * 회원가입
   * @param signupRequestDto SignupRequestDto
   * @returns AccessTokenDto
   */
  async signup(signupRequestDto: SignupRequestDto): Promise<AccessTokenDto> {
    const { email, password } = signupRequestDto

    //이메일로 회원 찾기
    const user:UserEntity = await this.userRepository.findByEmail(email)
    if(user) {
      throw new HttpException(CustomHttpException['CONFLICT_EMAIL'], HttpStatus.CONFLICT) //이메일 중복
    }

    //회원 생성 
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt) //DB패스워드 암호화
    await this.userRepository.createUser(email, hashedPassword)

    // JWT토큰 생성
    const payload = { email }
    const accessToken: string = await this.jwtService.sign(payload)

    return { accessToken }
  }

  /**
   * 로그인
   * @param signinRequestDto SigninRequestDto
   * @returns AccessTokenDto
   */
  async signin(signinRequestDto: SigninRequestDto): Promise<AccessTokenDto> {
    const { email, password } = signinRequestDto

    //이메일로 회원찾기
    const user: UserEntity = await this.userRepository.findByEmail(email)
    if(!user){
      throw new HttpException(CustomHttpException['UNAUTHORIZED_ACCOUNT'], HttpStatus.UNAUTHORIZED) //이메일 없는 경우
    }

    if(!(await bcrypt.compare(password, user['password']))){
      throw new HttpException(CustomHttpException['UNAUTHORIZED_ACCOUNT'], HttpStatus.UNAUTHORIZED)//패스워드가 다른경우
    }

    const payload = { email }
    const accessToken: string = await this.jwtService.sign(payload)

    return { accessToken }
  }

  /** 
   * @param user UserEntity
   * @returns EmailDto
   */
  async getMyInfo(user: UserEntity): Promise<EmailDto> {
    const email: string = user.email

    return { email }
  }
}