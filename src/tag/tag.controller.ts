import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto, Tag } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import UuidValidationPipe from 'src/common/pipes/UUIDValidation.pipe';
import { ApiOperation, ApiBody, ApiCreatedResponse } from '@nestjs/swagger';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  @ApiOperation({
    summary: 'Create new Tag',
    description: 'This endpoint creates a new tag',
  })
  @ApiBody({
    description: 'Tag name and color',
    type: CreateTagDto,
  })
  @ApiCreatedResponse({
    description: 'The tag was succesfully created',
    type: Tag,
  })
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagService.create(createTagDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all Tags',
    description: 'This endpoint returns a list of all tags',
  })
  findAll() {
    return this.tagService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get one Tag',
    description: 'This endpoint returns a single tag',
  })
  findOne(@Param('id', UuidValidationPipe) id: string) {
    return this.tagService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update one Tag',
    description: 'This endpoint updates the tag name and color',
  })
  @ApiBody({
    description: 'Updated tag information',
    type: UpdateTagDto,
  })
  update(
    @Param('id', UuidValidationPipe) id: string,
    @Body() updateTagDto: UpdateTagDto,
  ) {
    return this.tagService.update(id, updateTagDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Remove one Tag',
    description:
      'This endpoint removes a tag (with onCascade: "SET NULL" for task)',
  })
  remove(@Param('id', UuidValidationPipe) id: string) {
    return this.tagService.remove(id);
  }
}
