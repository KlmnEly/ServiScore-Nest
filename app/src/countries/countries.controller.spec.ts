import { Test, TestingModule } from '@nestjs/testing';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';

describe('CountriesController', () => {
  let controller: CountriesController;
  let service: CountriesService;

  const mockCountriesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountriesController],
      providers: [
        {
          provide: CountriesService,
          useValue: mockCountriesService,
        },
      ],
    }).compile();

    controller = module.get<CountriesController>(CountriesController);
    service = module.get<CountriesService>(CountriesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // ---------------- CREATE ----------------
  it('should call countriesService.create with correct dto', async () => {
    const dto: CreateCountryDto = { country_name: 'Colombia' };
    const result = { id_country: 1, ...dto };

    mockCountriesService.create.mockResolvedValue(result);

    expect(await controller.create(dto)).toEqual(result);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  // ---------------- FIND ALL ----------------
  it('should return all countries', async () => {
    const result = [
      { id_country: 1, name: 'Colombia' },
      { id_country: 2, name: 'Peru' },
    ];

    mockCountriesService.findAll.mockResolvedValue(result);

    expect(await controller.findAll()).toEqual(result);
    expect(service.findAll).toHaveBeenCalled();
  });

  // ---------------- FIND ONE ----------------
  it('should return a country by id', async () => {
    const result = { id_country: 1, name: 'Colombia' };

    mockCountriesService.findOne.mockResolvedValue(result);

    expect(await controller.findOne('1')).toEqual(result);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  // ---------------- UPDATE ----------------
  it('should update a country', async () => {
    const dto: UpdateCountryDto = { country_name: 'Updated Country' };
    const result = { id_country: 1, ...dto };

    mockCountriesService.update.mockResolvedValue(result);

    expect(await controller.update('1', dto)).toEqual(result);
    expect(service.update).toHaveBeenCalledWith(1, dto);
  });

  // ---------------- REMOVE ----------------
  it('should remove a country', async () => {
    mockCountriesService.remove.mockResolvedValue(undefined);

    await controller.remove('1');

    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
