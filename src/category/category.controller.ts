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
import { Category } from './entities/category.entity';

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
    type: Category,
  })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all Categories',
    description: 'This endpoint returns a list of all categories',
  })
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get one category',
    description: 'This endpoint returns a single category',
  })
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update one category',
    description:
      'This endpoint updates the category name and description',
  })
  @ApiBody({
    description: 'Updated Category information',
    type: UpdateCategoryDto,
  })
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Remove one category',
    description:
      'This endpoint removes a category (with onCascade: "SET NULL" for task)',
  })
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
