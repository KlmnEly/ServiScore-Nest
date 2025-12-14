import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateAccessDto } from './dto/create-access.dto';
import { UpdateAccessDto } from './dto/update-access.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Access } from './entities/access.entity';
import { DataSource, Repository } from 'typeorm';
import bcrypt from 'node_modules/bcryptjs';

@Injectable()
export class AccessesService {

  constructor(  
    @InjectRepository(Access)
    private readonly accessRepository: Repository<Access>,
    private dataSource: DataSource,
  ) { }
 
  // Create a new access record
  async create(access: CreateAccessDto) {
    if (!access || !access.email || !access.email.trim()) {
      throw new Error('ACcess data must be provided');
    }

    const queryRunner = this.dataSource.createQueryRunner();
    queryRunner.connect();
    queryRunner.startTransaction();

    try {
      const existingAccess = await queryRunner.manager.findOne(Access, {
        where: { email: access.email },
      });

      if (existingAccess) {
        throw new Error(`Access with email "${access.email}" already exists.`);
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(access.password, salt);

      // Create and save the new access
      const newAccess = queryRunner.manager.create(Access, {
        ...access,
        password: hashedPassword, // Store hashed password
      });
      const savedAccess = await queryRunner.manager.save(newAccess);

      // Successfully commit the transaction
      await queryRunner.commitTransaction();
      return savedAccess;

    } catch (err: any) {
      await queryRunner.rollbackTransaction();

      if (err instanceof ConflictException || err instanceof BadRequestException) {
        throw err;
      }

      throw new InternalServerErrorException('ERror creating access');

    } finally {
      await queryRunner.release();
    }

  }

  // Get all active accesses
  async getAllActiveAccesses() {
    try {
      const accesses = await this.accessRepository.find({
        where: {
          isActive: true,
        }
      });

      if (!accesses || accesses.length === 0) {
        throw new NotFoundException('No accesses found');
      }

      return accesses;
    } catch (err: any) {
      if (err.response?.statusCode) throw err;
      throw new InternalServerErrorException('Error retrieving accesses');
    }
  }

  // Get all accesses
  async getAll() {
    try {
      const accesses = await this.accessRepository.find();

      if (!accesses || accesses.length === 0) {
        throw new NotFoundException('No accesses found');
      }

      return accesses;
    } catch (err: any) {
      if (err.response?.statusCode) throw err;
      throw new InternalServerErrorException('Error retrieving accesses');
    }
  }

  // Get access by id
  async getById(id: number) {
    if (!id || id <= 0) {
      throw new BadRequestException('A valid id is required.');
    }

    try {
      const accesses = await this.accessRepository.findOne({
        where: {
          id_access: id,
          isActive: true
        },
      });

      if (!accesses) {
        throw new NotFoundException(`Access with id ${id} not found.`);
      }

      return accesses;
    } catch (err: any) {
      if (err.response?.statusCode) throw err;
      throw new InternalServerErrorException('Error fetching access by id.');
    }
  }

  // Get access by email
  async getByEmail(email: string) {
    if (!email || typeof email !== 'string' || !email.trim()) {
      throw new BadRequestException('A valid email is required.');
    }

    try {
      const access = await this.accessRepository.findOne({
        where: {
          email: email,
          isActive: true
        }
      });

      if (!access) {
        throw new NotFoundException(`Access with email "${email}" not found.`);
      }

      return access;
    } catch (err: any) {
      if (err.response?.statusCode) throw err;
      throw new InternalServerErrorException('Error fetching access by email.');
    }
  }

  // Update access
  async update(id: number, updateAccessDto: UpdateAccessDto) {
    if (!updateAccessDto.email || !updateAccessDto.email.trim()) {
      return 'No data to update';
    }

    const result = await this.accessRepository.update(id, {
      email: updateAccessDto.email
    });

    if (result.affected === 0) {
      throw new NotFoundException(`Access with id ${id} not found.`);
    }

    return this.accessRepository.findOneBy({ id_access: id });
  }

  // Soft delete (deactivate) or reactivate an access
  async remove(id: number) {
    const access = await this.accessRepository.findOneBy({ id_access: id });

    if (!access) {
      throw new NotFoundException(`Access with id ${id} not found.`);
    }

    // Toggle isActive state
    const newIsActiveState = !access.isActive;

    await this.accessRepository.update(id, { isActive: newIsActiveState });

    return { message: `Access with id ${id} has been ${newIsActiveState ? 'activated' : 'deactivated'}.` };
  }
}
