// src/auth/dto/register.dto.ts
import { IsEmail, IsString, IsNotEmpty, IsIn } from "class-validator";

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  name: string;

  @IsString()
  @IsIn(["admin", "formateur", "participant"])
  role: "admin" | "formateur" | "participant";
}
