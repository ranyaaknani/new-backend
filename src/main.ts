import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import crypto from "crypto";

// ✅ Correction : ne pas écraser global.crypto si déjà présent
if (!globalThis.crypto) {
  (globalThis as any).crypto = crypto;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🔥 Ajouter CORS ici
  app.enableCors({
    origin: ['http://localhost:3000'], // autoriser le frontend NextJS
    credentials: true, // important pour envoyer les cookies et les tokens
  });

  app.use(cookieParser());

  // 🔥 Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('API Formation en ligne')
    .setDescription('Documentation API pour Admin, Formateur, Participant')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT || 3001);
  console.log(`✅ Serveur démarré sur http://localhost:${process.env.PORT || 3001}`);
}
bootstrap();
