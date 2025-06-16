import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FormationsService } from './formations.service';
import { CreateFormationDto } from './dto/create-formation.dto';
import { Formation } from './entities/formation.entity';
import { UpdateFormationDto } from './dto/update-formation.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('formations')
export class FormationsController {
  constructor(private readonly formationsService: FormationsService) {}

  @Post('add')
  @UseInterceptors(FileInterceptor('csvFile'))
  async create(@Body() createFormationDto: CreateFormationDto) {
    try {
      console.log('Received DTO:', createFormationDto);
      const result = await this.formationsService.create(createFormationDto);
      return {
        success: true,
        message: 'Formation created successfully',
        data: result,
      };
    } catch (error) {
      console.error('Controller error:', error);
      return {
        success: false,
        message: 'Failed to create formation',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        error: error.message,
      };
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

  @Get('formation/:formationId')
  async getParticipantsByFormation(@Param('formationId') formationId: string) {
    try {
      const participants =
        await this.formationsService.getParticipantsByFormationId(formationId);

      return participants.map((participant) => ({
        id: participant.id,
        email: participant.email,
        name: participant.name,
        role: participant.role,
        status: participant.status,
        createdAt: participant.createdAt,
        updatedAt: participant.updatedAt,
      }));
    } catch (error) {
      console.error('Error fetching participants:', error);
      throw new HttpException(
        error.message || 'Failed to fetch participants',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
