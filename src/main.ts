import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Todo list ')
    .setDescription('The todo list API description')
    .setVersion('1.0')
    .addBearerAuth(
      // Enable Bearer Auth here
      {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
      name: "JWT",
      description: "Enter JWT token",
      in: "header",
      },
      "JWT-auth" // We will use this Bearer Auth with the JWT-auth name on the controller function      
    )
    .addTag('lists')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(3000); 
}
bootstrap();
