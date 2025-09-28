import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module.js";
import dotenv from "dotenv";

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }),);

  app.enableCors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);


  console.log("Server should start on port:", process.env.PORT);
  console.log("-------------------------------------------------------------------");
  console.log("CORS should be enabled for origin:", process.env.CORS_ORIGIN || "http://localhost:5173");
  console.log(`Server running on http://localhost:${port}`);
  console.log(`API available at http://localhost:${port}/api/feed`);
  console.log("-------------------------------------------------------------------");

}

bootstrap();
