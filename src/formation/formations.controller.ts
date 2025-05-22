import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Patch,
} from '@nestjs/common';
import { FormationsService } from './formations.service';
import { CreateFormationDto } from './dto/create-formation.dto';
import { Formation } from './entities/formation.entity';

@Controller('formations')
export class FormationsController {
  constructor(private readonly formationsService: FormationsService) {}

  @Post()
  create(@Body() createFormationDto: CreateFormationDto): Promise<Formation> {
    return this.formationsService.create(createFormationDto);
  }

  @Get()
  findAll(): Promise<Formation[]> {
    return this.formationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Formation> {
    return this.formationsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateFormationDto: Partial<CreateFormationDto>,
  ): Promise<Formation> {
    return this.formationsService.update(id, updateFormationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.formationsService.remove(id);
  }

  @Patch(':id/archive')
  archive(@Param('id') id: string): Promise<Formation> {
    return this.formationsService.archive(id);
  }
}
