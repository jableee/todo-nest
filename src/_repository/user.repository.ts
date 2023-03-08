import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CustomHttpException } from '../_commons/contants/http-exception.contant';
import { UserEntity } from 'src/_entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository {
	// constructor(@InjectRepository(UserRepository) private userRepository: Repository<UserEntity>// private userRepository: UserEntity
  constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>
	) {}
  
  // 이메일로 회원 찾기
  async findByEmail(email: string): Promise<UserEntity> {
    try {
      const user: UserEntity = await this.userRepository.findOne({
        where: { email },
        select: ['id', 'email', 'password'],
      });
			// const user = await this.userRepository.f

      return user;
    } catch (error) {
      console.log(error)
      throw new HttpException(
        CustomHttpException['DB_SERVER_ERROR'],
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // 회원 생성
  async createUser(email: string, password: string): Promise<void> {
    try {
      await this.userRepository.insert({
        email,
        password,
      });
    } catch (error) {
      throw new HttpException(
        CustomHttpException['DB_SERVER_ERROR'],
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
