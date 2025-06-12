import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateResourceDto } from './dto/create-ressource.dto';
import { ResourceEntity } from './entities/ressource.entity';
import { ResourcesService } from './ressource.service';
import { UpdateResourceDto } from './dto/update-resource.dto';

@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Post('add')
  async create(@Body() createResourceDto: CreateResourceDto): Promise<{
    success: boolean;
    message: string;
    data: ResourceEntity;
  }> {
    try {
      const resource = await this.resourcesService.create(createResourceDto);
      return {
        success: true,
        message: 'Resource created successfully',
        data: resource,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Failed to create resource',
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  findAll(): Promise<ResourceEntity[]> {
    return this.resourcesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ResourceEntity> {
    return this.resourcesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateResourceDto: UpdateResourceDto,
  ): Promise<ResourceEntity> {
    return this.resourcesService.update(id, updateResourceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.resourcesService.remove(id);
  }
}
