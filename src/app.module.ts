import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from 'src/_configs/typeorm.config';
import { AppController } from './app.controller';
import { LoggerMiddleware } from 'src/_commons/middlewares/logger.moddleware';
import { UserModule } from 'src/user/user.module'
import { CategoryModule } from './category/category.module'; 

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), UserModule, CategoryModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
