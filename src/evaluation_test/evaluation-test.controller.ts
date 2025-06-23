import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { EvaluationTestService } from './evaluation-test.service';
import { CreateEvaluationTestDto } from './dto/create-ecaluationTest.dto';
import { UpdateEvaluationTestDto } from './dto/update-ecaluationTest.dto';

@Controller('evaluation-tests')
export class EvaluationTestController {
  constructor(private readonly evaluationTestService: EvaluationTestService) {}

  @Post()
  create(@Body() createEvaluationTestDto: CreateEvaluationTestDto) {
    return this.evaluationTestService.create(createEvaluationTestDto);
  }

  @Get()
  findAll() {
    return this.evaluationTestService.findAll();
  }

  @Get('enabled')
  findEnabledTests() {
    return this.evaluationTestService.findEnabledTests();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.evaluationTestService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateEvaluationTestDto: UpdateEvaluationTestDto,
  ) {
    return this.evaluationTestService.update(id, updateEvaluationTestDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.evaluationTestService.remove(id);
  }
}
