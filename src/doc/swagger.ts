import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home music library API')
    .setVersion('1.0')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  const PORT = process.env.PORT || 4000;
  await app.listen(PORT);
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📚 Swagger docs on http://localhost:${PORT}/doc`);
}

bootstrap();