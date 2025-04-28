"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
const swagger_1 = require("@nestjs/swagger");
const crypto_1 = require("crypto");
if (!globalThis.crypto) {
    globalThis.crypto = crypto_1.default;
}
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: ['http://localhost:3000'],
        credentials: true,
    });
    app.use(cookieParser());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('API Formation en ligne')
        .setDescription('Documentation API pour Admin, Formateur, Participant')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api-docs', app, document);
    await app.listen(process.env.PORT || 3001);
    console.log(`✅ Serveur démarré sur http://localhost:${process.env.PORT || 3001}`);
}
bootstrap();
//# sourceMappingURL=main.js.map