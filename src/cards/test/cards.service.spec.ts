import { Test, TestingModule } from '@nestjs/testing';
import { CardsService } from '../cards.service';
import { PrismaService } from '../../prisma/prisma.service';
// Mock PrismaService
const mockPrismaService = {
  card: {
    create: jest.fn(),
    findUnique: jest.fn(),
  },
};

describe('CardsService', () => {
  let service: CardsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CardsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<CardsService>(CardsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
