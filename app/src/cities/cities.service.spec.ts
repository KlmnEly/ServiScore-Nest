import { Test, TestingModule } from '@nestjs/testing';
import { CitiesService } from './cities.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './entities/city.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

describe('CitiesService', () => {
  let service: CitiesService;
  let repository: Repository<City>;

  const mockCityRepository = {
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
        CitiesService,
        {
          provide: getRepositoryToken(City),
          useValue: mockCityRepository,
        },
      ],
    }).compile();

    service = module.get<CitiesService>(CitiesService);
    repository = module.get<Repository<City>>(getRepositoryToken(City));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // ---------------- CREATE ----------------
  it('should create and save a city', async () => {
    const dto: CreateCityDto = {
      city_name: 'Bogotá',
    };

    const city = { id_city: 1, ...dto };

    mockCityRepository.create.mockReturnValue(city);
    mockCityRepository.save.mockResolvedValue(city);

    const result = await service.create(dto);

    expect(repository.create).toHaveBeenCalledWith(dto);
    expect(repository.save).toHaveBeenCalledWith(city);
    expect(result).toEqual(city);
  });

  // ---------------- FIND ALL ----------------
  it('should return all cities', async () => {
    const cities = [
      { id_city: 1, city_name: 'Bogotá' },
      { id_city: 2, city_name: 'Medellín' },
    ];

    mockCityRepository.find.mockResolvedValue(cities);

    const result = await service.findAll();

    expect(repository.find).toHaveBeenCalled();
    expect(result).toEqual(cities);
  });

  // ---------------- FIND ONE (exists) ----------------
  it('should return a city by id', async () => {
    const city = { id_city: 1, city_name: 'Bogotá' };

    mockCityRepository.findOneBy.mockResolvedValue(city);

    const result = await service.findOne(1);

    expect(repository.findOneBy).toHaveBeenCalledWith({
      id_city: 1,
    });
    expect(result).toEqual(city);
  });

  // ---------------- FIND ONE (not exists) ----------------
  it('should throw NotFoundException if city does not exist', async () => {
    mockCityRepository.findOneBy.mockResolvedValue(null);

    await expect(service.findOne(99)).rejects.toThrow(NotFoundException);
  });

  // ---------------- UPDATE ----------------
  it('should update a city', async () => {
    const dto: UpdateCityDto = {
      city_name: 'Bogotá Updated',
    };

    const updateResult = { affected: 1 };

    mockCityRepository.update.mockResolvedValue(updateResult);

    const result = await service.update(1, dto);

    expect(repository.update).toHaveBeenCalledWith(1, dto);
    expect(result).toEqual(updateResult);
  });

  // ---------------- REMOVE ----------------
  it('should delete a city', async () => {
    mockCityRepository.delete.mockResolvedValue({ affected: 1 });

    const result = await service.remove(1);

    expect(repository.delete).toHaveBeenCalledWith(1);
    expect(result).toEqual({ affected: 1 });
  });
});
