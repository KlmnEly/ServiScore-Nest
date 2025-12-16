import { Test, TestingModule } from '@nestjs/testing';
import { CitiesController } from './cities.controller';
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

describe('CitiesController', () => {
  let controller: CitiesController;
  let service: CitiesService;

  const mockCitiesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CitiesController],
      providers: [
        {
          provide: CitiesService,
          useValue: mockCitiesService,
        },
      ],
    }).compile();

    controller = module.get<CitiesController>(CitiesController);
    service = module.get<CitiesService>(CitiesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // ---------------- CREATE ----------------
  it('should create a city', async () => {
    const dto: CreateCityDto = { city_name: 'Bogotá' };
    const result = { id_city: 1, ...dto };

    mockCitiesService.create.mockResolvedValue(result);

    expect(await controller.create(dto)).toEqual(result);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  // ---------------- FIND ALL ----------------
  it('should return all cities', async () => {
    const result = [
      { id_city: 1, city_name: 'Bogotá' },
      { id_city: 2, city_name: 'Medellín' },
    ];

    mockCitiesService.findAll.mockResolvedValue(result);

    expect(await controller.findAll()).toEqual(result);
    expect(service.findAll).toHaveBeenCalled();
  });

  // ---------------- FIND ONE ----------------
  it('should return a city by id', async () => {
    const result = { id_city: 1, city_name: 'Bogotá' };

    mockCitiesService.findOne.mockResolvedValue(result);

    expect(await controller.findOne('1')).toEqual(result);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  // ---------------- UPDATE ----------------
  it('should update a city', async () => {
    const dto: UpdateCityDto = { city_name: 'Bogotá Updated' };
    const result = { id_city: 1, ...dto };

    mockCitiesService.update.mockResolvedValue(result);

    expect(await controller.update('1', dto)).toEqual(result);
    expect(service.update).toHaveBeenCalledWith(1, dto);
  });

  // ---------------- REMOVE ----------------
  it('should remove a city', async () => {
    mockCitiesService.remove.mockResolvedValue(undefined);

    await controller.remove('1');

    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
