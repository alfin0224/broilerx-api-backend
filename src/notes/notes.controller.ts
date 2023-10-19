import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { NotesService } from './notes.service';
import { Note } from './note.model';
import { ApiTags, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger'; // Import Swagger decorators

@Controller('notes')
@ApiTags('Notes') // Group related endpoints under the "Notes" tag
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Get all notes', type: Note, isArray: true }) // Document the response
  async findAll() {
    return this.notesService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'The ID of the note' }) // Document the parameter
  @ApiResponse({ status: 200, description: 'Get a note by ID', type: Note })
  @ApiResponse({ status: 404, description: 'Note not found' })
  async findOne(@Param('id') id: string) {
    return this.notesService.findOne(id);
  }

  @Post()
  @ApiBody({ type: Note }) // Document the request body
  @ApiResponse({ status: 201, description: 'Note created', type: Note })
  async create(@Body() noteData: Note) {
    return this.notesService.create(noteData);
  }

  @Put(':id')
  @ApiParam({ name: 'id', description: 'The ID of the note' })
  @ApiBody({ type: Note })
  @ApiResponse({ status: 200, description: 'Note updated', type: Note })
  async update(@Param('id') id: string, @Body() noteData: Note) {
    return this.notesService.update(id, noteData);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'The ID of the note' })
  @ApiResponse({ status: 200, description: 'Note removed' })
  async remove(@Param('id') id: string) {
    return this.notesService.remove(id);
  }
}
