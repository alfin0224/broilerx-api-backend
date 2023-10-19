import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotesController } from './notes/notes.controller';
import { NotesService } from './notes/notes.service';
import { NoteSchema } from './notes/note.model';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/broilerx_notes'),
    MongooseModule.forFeature([{ name: 'Note', schema: NoteSchema }]),
  ],
  controllers: [NotesController],
  providers: [NotesService],
})
export class AppModule {}
