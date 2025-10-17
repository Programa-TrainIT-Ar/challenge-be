import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaExceptionFilter } from './filters/prisma-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Activa CORS
  app.enableCors({
    // Permite cualquier origen en desarrollo. Considera cambiar a tu dominio de frontend en producción.
    origin: true, 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    // ¡CRUCIAL! Asegura que la cabecera 'Authorization' se permita
    allowedHeaders: 'Content-Type, Accept, Authorization', 
    credentials: true,
  });

  //Activa validaciones
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      disableErrorMessages: false,
    }),
  );

  //Activa el manejo de errores
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaExceptionFilter(httpAdapter));

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
    .addTag('Challenge')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    jsonDocumentUrl: '/api-json', // URL para descargar el JSON
    yamlDocumentUrl: '/api-yaml', // URL para descargar el YAML
  });

  const PORT = process.env.PORT || 3001;
  await app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

bootstrap();
