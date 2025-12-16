import { Test, TestingModule } from '@nestjs/testing';
import { CountriesService } from './countries.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from './entities/country.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';

describe('CountriesService', () => {
  let service: CountriesService;
  let repository: Repository<Country>;

  const mockCountryRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CountriesService,
        {
          provide: getRepositoryToken(Country),
          useValue: mockCountryRepository,
        },
      ],
    }).compile();

    service = module.get<CountriesService>(CountriesService);
    repository = module.get<Repository<Country>>(
      getRepositoryToken(Country),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // ---------------- CREATE ----------------
  it('should create and save a country', async () => {
    const dto: CreateCountryDto = {
      country_name: 'Colombia',
    };

    const country = { id_country: 1, ...dto };

    mockCountryRepository.create.mockReturnValue(country);
    mockCountryRepository.save.mockResolvedValue(country);

    const result = await service.create(dto);

    expect(repository.create).toHaveBeenCalledWith(dto);
    expect(repository.save).toHaveBeenCalledWith(country);
    expect(result).toEqual(country);
  });

  // ---------------- FIND ALL ----------------
  it('should return all countries', async () => {
    const countries = [
      { id_country: 1, name: 'Colombia' },
      { id_country: 2, name: 'Peru' },
    ];

    mockCountryRepository.find.mockResolvedValue(countries);

    const result = await service.findAll();

    expect(repository.find).toHaveBeenCalled();
    expect(result).toEqual(countries);
  });

  // ---------------- FIND ONE (exists) ----------------
  it('should return a country by id', async () => {
    const country = { id_country: 1, country_name: 'Colombia' };

    mockCountryRepository.findOneBy.mockResolvedValue(country);

    const result = await service.findOne(1);

    expect(repository.findOneBy).toHaveBeenCalledWith({
      id_country: 1,
    });
    expect(result).toEqual(country);
  });

  // ---------------- FIND ONE (not exists) ----------------
  it('should throw NotFoundException if country does not exist', async () => {
    mockCountryRepository.findOneBy.mockResolvedValue(null);

    await expect(service.findOne(99)).rejects.toThrow(NotFoundException);
  });

  // ---------------- UPDATE ----------------
  it('should update a country', async () => {
    const existingCountry = { id_country: 1, country_name: 'Colombia' };
    const dto: UpdateCountryDto = { country_name: 'Colombia Updated' };

    jest
      .spyOn(service, 'findOne')
      .mockResolvedValue(existingCountry as Country);

    mockCountryRepository.save.mockResolvedValue({
      ...existingCountry,
      ...dto,
    });

    const result = await service.update(1, dto);

    expect(service.findOne).toHaveBeenCalledWith(1);
    expect(repository.save).toHaveBeenCalledWith({
      ...existingCountry,
      ...dto,
    });
    expect(result.country_name).toBe('Colombia Updated');
  });

  // ---------------- REMOVE ----------------
  it('should delete a country', async () => {
    const country = { id_country: 1, country_name: 'Colombia' };

    jest
      .spyOn(service, 'findOne')
      .mockResolvedValue(country as Country);

    mockCountryRepository.delete.mockResolvedValue({ affected: 1 });

    const result = await service.remove(1);

    expect(service.findOne).toHaveBeenCalledWith(1);
    expect(repository.delete).toHaveBeenCalledWith(1);
    expect(result).toEqual({ affected: 1 });
  });
});
