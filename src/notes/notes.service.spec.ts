import { Test, TestingModule } from '@nestjs/testing';
import { NotesService } from './notes.service';
import { getModelToken } from '@nestjs/mongoose';
import { Note } from './note.model';

const mockNoteModel = {
  find: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndRemove: jest.fn(),
};

describe('NotesService', () => {
  let service: NotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotesService,
        {
          provide: getModelToken('Note'),
          useValue: mockNoteModel,
        },
      ],
    }).compile();

    service = module.get<NotesService>(NotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all notes', async () => {
    const sampleNote: Note = {
        id: '1',
        title: 'Sample Title',
        content: 'Sample Content',
        timestamp: new Date(),
      };
      
      const expectedNotes: Note[] = [sampleNote]; 
    mockNoteModel.find.mockReturnValue({ exec: jest.fn().mockResolvedValue(expectedNotes) });

    const notes = await service.findAll();
    expect(notes).toEqual(expectedNotes);
  });

  it('should find one note by ID', async () => {
    const sampleNote: Note = {
        id: '1',
        title: 'Sample Title',
        content: 'Sample Content',
        timestamp: new Date(),
      };
      
    const expectedNote: Note = sampleNote;
    const noteId = 'some-id';
    mockNoteModel.findById.mockReturnValue({ exec: jest.fn().mockResolvedValue(expectedNote) });

    const note = await service.findOne(noteId);
    expect(note).toEqual(expectedNote);
  });

  // Add similar tests for create, update, and remove methods
});
