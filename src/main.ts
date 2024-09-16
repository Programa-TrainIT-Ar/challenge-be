import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  //Activa CORS
  app.enableCors();
  
  //Genera la documentacio con swagger
  const config = new DocumentBuilder()
    .setTitle('Challenge')
    .setDescription('Proyecto creado en Nestjs Con Prisma ')
    .setVersion('1.0')
    //.addBearerAuth()
    .addTag('Module')
    .addTag('Cell')
    .addTag('Quiz')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  
  
  //Activa validaciones
  app.useGlobalPipes(new ValidationPipe({whitelist: true, transform: true }));
  
  const PORT = process.env.PORT
  await app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
bootstrap();
