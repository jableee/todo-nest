import {  Module } from "@nestjs/common";
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtStrategy } from '../_commons/auth/jwt.strategy'
import { UserRepository } from '../_repository/user.repository'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import * as dotenv from 'dotenv'
import { UserEntity } from "src/_entities/user.entity";
dotenv.config()

@Module({
  imports: [
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_SECRET_EXPIRES_IN },
    }),
    // TypeOrmModule.forFeature([UserRepository],)
    // UserRepository
    TypeOrmModule.forFeature([UserEntity])
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy, UserRepository]
  // providers: [UserService, JwtStrategy]
})

export class UserModule {}
