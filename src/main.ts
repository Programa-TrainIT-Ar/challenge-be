import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaExceptionFilter } from './filters/prisma-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  //Activa CORS
  app.enableCors()

  //Activa validaciones
  app.useGlobalPipes(new ValidationPipe({ 
    whitelist: true, 
    transform: true ,
    disableErrorMessages: false
  }));

  //Activa el manejo de errores
  app.useGlobalFilters(new PrismaExceptionFilter());
  
  //Genera la documentacio con swagger
  const config = new DocumentBuilder()
    .setTitle('Challenge')
    .setDescription('Proyecto creado en Nestjs Con Prisma ')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Quiz')
    .addTag('Question')
    .addTag('Module')
    .addTag('Cell')
    .addTag('User')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const PORT = process.env.PORT;
  await app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

bootstrap();
