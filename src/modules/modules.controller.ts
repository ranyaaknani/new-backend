import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ModuleEntity } from './entities/module.entity';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { ModulesService } from './modules.service';

@Controller('modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @Post('add')
  async create(@Body() createModuleDto: CreateModuleDto): Promise<{
    success: boolean;
    message: string;
    data: ModuleEntity;
  }> {
    try {
      const module = await this.modulesService.create(createModuleDto);
      return {
        success: true,
        message: 'Module created successfully',
        data: module,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Failed to create module',
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  findAll(): Promise<ModuleEntity[]> {
    return this.modulesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ModuleEntity> {
    return this.modulesService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateModuleDto: UpdateModuleDto,
  ): Promise<ModuleEntity> {
    return this.modulesService.update(id, updateModuleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.modulesService.remove(id);
  }
}
