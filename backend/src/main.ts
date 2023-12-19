import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder } from '@nestjs/swagger'
import { SwaggerModule } from '@nestjs/swagger/dist'
import { NestExpressApplication } from '@nestjs/platform-express'

async function bootstrap() {
  try {
    const PORT = process.env.PORT || 5000
    const app = await NestFactory.create<NestExpressApplication>(AppModule)

    const config = new DocumentBuilder()
      .setTitle('Практика по Nest.js')
      .setDescription('Документация по REST API')
      .setVersion('1.0.0')
      .addTag('winfixx')
      .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/api/docs', app, document)

    await app.listen(PORT, () => console.log(`Server start on port = ${PORT}`))

  } catch (error) {
    console.log(error)
  }
}
bootstrap()