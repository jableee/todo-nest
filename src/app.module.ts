import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from 'src/_configs/typeorm.config';
import { AppController } from './app.controller';
import { LoggerMiddleware } from 'src/_commons/middlewares/logger.moddleware';
import { UserModule } from 'src/user/user.module'
import { CategoryModule } from './category/category.module'; 
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), UserModule, CategoryModule, TodoModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
