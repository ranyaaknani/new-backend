import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FormationsService } from './formations.service';
import { CreateFormationDto } from './dto/create-formation.dto';
import { Formation } from './entities/formation.entity';
import { UpdateFormationDto } from './dto/update-formation.dto';

@Controller('formations')
export class FormationsController {
  constructor(private readonly formationsService: FormationsService) {}

  @Post('add')
  async create(@Body() createFormationDto: CreateFormationDto): Promise<{
    success: boolean;
    message: string;
    data: Formation;
  }> {
    try {
      const formation = await this.formationsService.create(createFormationDto);
      return {
        success: true,
        message: 'Formation created successfully',
        data: formation,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Failed to create formation',
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
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
    @Body() updateFormationDto: UpdateFormationDto,
  ): Promise<Formation> {
    return this.formationsService.update(id, updateFormationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.formationsService.remove(id);
  }
}
