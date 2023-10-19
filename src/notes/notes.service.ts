import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Note } from './note.model';

@Injectable()
export class NotesService {
  constructor(@InjectModel('Note') private readonly noteModel: Model<Note>) {}

  async findAll() {
    return this.noteModel.find().exec();
  }

  async findOne(id: string) {
    return this.noteModel.findById(id).exec();
  }

  async create(noteData: Note) {
    const createdNote = new this.noteModel(noteData);
    return createdNote.save();
  }

  async update(id: string, noteData: Note) {
    return this.noteModel.findByIdAndUpdate(id, noteData, { new: true }).exec();
  }

  async remove(id: string) {
    return this.noteModel.findByIdAndRemove(id).exec();
  }
}
