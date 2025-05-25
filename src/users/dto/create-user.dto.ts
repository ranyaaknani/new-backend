import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsIn,
  IsOptional,
} from 'class-validator';
import { Role } from '../../common/enums/role.enum';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsIn([Role.Participant, Role.Formateur, Role.Admin])
  @IsOptional()
  role: Role;
}
