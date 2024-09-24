import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  
  app.enableCors();
  
  
  const config = new DocumentBuilder()
    .setTitle('Challenge')
    .setDescription('Nestjs modelo candidato ')
    .setVersion('1.0')
    
    .addTag('candidatos')
    .addTag('usuarios')
    
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  
  app.useGlobalPipes(new ValidationPipe({whitelist: true, transform: true }));
  
  const PORT = process.env.PORT
  await app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
bootstrap();
