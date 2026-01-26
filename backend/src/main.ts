import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors({
    origin: [process.env.FRONTEND_URL, process.env.FRONTEND_URL_DEVELOP],
    credentials: true,
  })
  app.use(cookieParser())
  await app.listen(process.env.PORT ?? 3333)
}
void bootstrap()
