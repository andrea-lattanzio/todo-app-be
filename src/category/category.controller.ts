import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiOperation, ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
import UuidValidationPipe from 'src/common/pipes/UUIDValidation.pipe';
import { GetUser } from 'src/common/decorators/getuser.decorator';
import { CategoryDto } from './dto/category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({
    summary: 'Create new Category',
    description: 'This endpoint creates a new category',
  })
  @ApiBody({
    description: 'Category name and description',
    type: CreateCategoryDto,
  })
  @ApiCreatedResponse({
    description: 'The category was succesfully created',
    type: CategoryDto,
  })
  create(
    @GetUser('id') userId: string,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    return this.categoryService.create(userId, createCategoryDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all Categories',
    description: 'This endpoint returns a list of all categories',
  })
  findAll(@GetUser('id') userId: string): Promise<CategoryDto[]> {
    return this.categoryService.findAll(userId);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get one Category',
    description: 'This endpoint returns a single category',
  })
  findOne(@Param('id', UuidValidationPipe) id: string): Promise<CategoryDto> {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update one Category',
    description: 'This endpoint updates the category name and description',
  })
  @ApiBody({
    description: 'Updated Category information',
    type: UpdateCategoryDto,
  })
  update(
    @Param('id', UuidValidationPipe) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryDto> {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Remove one category',
    description:
      'This endpoint removes a category (with onCascade: "SET NULL" for task)',
  })
  remove(@Param('id', UuidValidationPipe) id: string): Promise<CategoryDto> {
    return this.categoryService.remove(id);
  }
}
