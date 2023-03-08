import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './_commons/exceptions/httpException.fillter';
declare const module: any

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000
  app.useGlobalFilters(new HttpExceptionFilter())
  app.enableCors();
  await app.listen(port);
  console.log(`listening on port ${port}`)
  console.log(process.env.NODE_ENV)

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
