import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { PrismaExceptionFilter } from './filters/prisma-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{ logger: ['error', 'warn', 'log', 'debug'] });

  //Activa CORS
  app.enableCors();

  //Genera la documentacio con swagger
  const config = new DocumentBuilder()
    .setTitle('Challenge')
    .setDescription('Proyecto creado en Nestjs Con Prisma ')
    .setVersion('1.0')
    //.addBearerAuth()
    .addTag('Quiz')
    .addTag('Question')
    .addTag('Module')
    .addTag('Cell')
    .addTag('User')
    .addTag('Auth')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  //Activa validaciones
  app.useGlobalPipes(new ValidationPipe({ 
    whitelist: true, 
    transform: true ,
    disableErrorMessages: false
  }));

  app.useGlobalFilters(new PrismaExceptionFilter());

  const PORT = process.env.PORT;
  await app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
bootstrap();
