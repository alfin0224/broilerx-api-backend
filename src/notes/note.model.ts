import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export const NoteSchema = new mongoose.Schema({
  title: String,
  content: String,
  timestamp: { type: Date, default: Date.now },
});

export class Note {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  timestamp: Date;
}
