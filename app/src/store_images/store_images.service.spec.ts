import { Test, TestingModule } from '@nestjs/testing';
import { StoreImagesService } from './store_images.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StoreImage } from './entities/store_image.entity';
import { CreateStoreImageDto } from './dto/create-store_image.dto';
import { UpdateStoreImageDto } from './dto/update-store_image.dto';

describe('StoreImagesService', () => {
  let service: StoreImagesService;
  let repository: Repository<StoreImage>;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StoreImagesService,
        {
          provide: getRepositoryToken(StoreImage),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<StoreImagesService>(StoreImagesService);
    repository = module.get<Repository<StoreImage>>(
      getRepositoryToken(StoreImage),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // ---------------- CREATE ----------------
  it('should create and save a store image', async () => {
    const dto: CreateStoreImageDto = {
      store_id: 1,
      image_id: 2,
    };

    const entity = { id_store_image: 1, ...dto };

    mockRepository.create.mockReturnValue(entity);
    mockRepository.save.mockResolvedValue(entity);

    const result = await service.create(dto);

    expect(repository.create).toHaveBeenCalledWith(dto);
    expect(repository.save).toHaveBeenCalledWith(entity);
    expect(result).toEqual(entity);
  });

  // ---------------- FIND ALL ----------------
  it('should return all store images', async () => {
    const entities = [
      { id_store_image: 1 },
      { id_store_image: 2 },
    ];

    mockRepository.find.mockResolvedValue(entities);

    const result = await service.findAll();

    expect(repository.find).toHaveBeenCalled();
    expect(result).toEqual(entities);
  });

  // ---------------- FIND ONE ----------------
  it('should return one store image by id', async () => {
    const entity = { id_store_image: 1 };

    mockRepository.findOneBy.mockResolvedValue(entity);

    const result = await service.findOne(1);

    expect(repository.findOneBy).toHaveBeenCalledWith({
      id_store_image: 1,
    });
    expect(result).toEqual(entity);
  });

  // ---------------- UPDATE ----------------
  it('should update a store image', async () => {
    const dto: UpdateStoreImageDto = {
      store_id: 2,
      image_id: 3,
    };

    const updateResult = { affected: 1 };

    mockRepository.update.mockResolvedValue(updateResult);

    const result = await service.update(1, dto);

    expect(repository.update).toHaveBeenCalledWith(1, dto);
    expect(result).toEqual(updateResult);
  });

  // ---------------- REMOVE ----------------
  it('should delete a store image', async () => {
    const entity = { id_store_image: 1 };

    jest
      .spyOn(service, 'findOne')
      .mockResolvedValue(entity as StoreImage);

    mockRepository.delete.mockResolvedValue({ affected: 1 });

    const result = await service.remove(1);

    expect(service.findOne).toHaveBeenCalledWith(1);
    expect(repository.delete).toHaveBeenCalledWith(1);
    expect(result).toEqual({ affected: 1 });
  });
});
