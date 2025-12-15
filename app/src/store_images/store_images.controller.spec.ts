import { Test, TestingModule } from '@nestjs/testing';
import { StoreImagesController } from './store_images.controller';
import { StoreImagesService } from './store_images.service';
import { CreateStoreImageDto } from './dto/create-store_image.dto';
import { UpdateStoreImageDto } from './dto/update-store_image.dto';

describe('StoreImagesController', () => {
  let controller: StoreImagesController;
  let service: StoreImagesService;

  const mockStoreImagesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoreImagesController],
      providers: [
        {
          provide: StoreImagesService,
          useValue: mockStoreImagesService,
        },
      ],
    }).compile();

    controller = module.get<StoreImagesController>(StoreImagesController);
    service = module.get<StoreImagesService>(StoreImagesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // ---------------- CREATE ----------------
  it('should call service.create with correct dto', async () => {
    const dto: CreateStoreImageDto = {
      store_id: 1,
      image_id: 2,
    };

    const result = { id: 1, ...dto };

    mockStoreImagesService.create.mockResolvedValue(result);

    expect(await controller.create(dto)).toEqual(result);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  // ---------------- FIND ALL ----------------
  it('should return all store images', async () => {
    const result = [
      { id: 1, store_id: 1, image_id: 2 },
      { id: 2, store_id: 2, image_id: 3 },
    ];

    mockStoreImagesService.findAll.mockResolvedValue(result);

    expect(await controller.findAll()).toEqual(result);
    expect(service.findAll).toHaveBeenCalled();
  });

  // ---------------- FIND ONE ----------------
  it('should return one store image by id', async () => {
    const result = { id: 1, store_id: 1, image_id: 2 };

    mockStoreImagesService.findOne.mockResolvedValue(result);

    expect(await controller.findOne('1')).toEqual(result);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  // ---------------- UPDATE ----------------
  it('should update store image', async () => {
    const dto: UpdateStoreImageDto = {
      store_id: 2,
      image_id: 3,
    };

    const result = { id: 1, ...dto };

    mockStoreImagesService.update.mockResolvedValue(result);

    expect(await controller.update('1', dto)).toEqual(result);
    expect(service.update).toHaveBeenCalledWith(1, dto);
  });

  // ---------------- REMOVE ----------------
  it('should remove store image', async () => {
    mockStoreImagesService.remove.mockResolvedValue(undefined);

    await controller.remove('1');

    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
