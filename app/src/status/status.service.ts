// src/status/status.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Status } from './entities/status.entity';

@Injectable()
export class StatusService {
  constructor(
    // Inject the Status repository
    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>,
  ) { }

  /**
   * Create a new status
   * @param createStatusDto - Data to create status
   * @returns The created status
   */
  async createStus(createStatusDto: CreateStatusDto): Promise<Status> {
    // Create a new status instance with the provided data
    const status = this.statusRepository.create(createStatusDto);
    // Save the status to the database
    return await this.statusRepository.save(status);
  }

  /**
   * Find all non-deleted statuses
   * @returns Array of statuses ordered by name
   */
  async findAllStatus(): Promise<Status[]> {
    return await this.statusRepository.find({
      // Only find non-deleted statuses (where deletedAt is NULL)
      where: { deletedAtStatus: IsNull() },
      // Order by name in ascending order
      order: { name: 'ASC' },
    });
  }

  /**
   * Find a status by ID
   * @param id - Status ID (UUID)
   * @returns The found status
   * @throws NotFoundException if status is not found or is deleted
   */
  async findStatusById(id: number): Promise<Status> {
    const status = await this.statusRepository.findOne({
      where: {
        id,
        // Ensure the status is not soft-deleted
        deletedAtStatus: IsNull()
      }
    });

    if (!status) {
      throw new NotFoundException(`Status with ID "${id}" not found`);
    }

    return status;
  }

  /**
   * Update a status
   * @param id - Status ID to update
   * @param updateStatusDto - Data to update
   * @returns The updated status
   */
  async updateStatus(id: number, updateStatusDto: UpdateStatusDto): Promise<Status> {
    // Find the status first (will throw if not found)
    const status = await this.findStatusById(id);
    // Update the status with new data
    Object.assign(status, updateStatusDto);
    // Save changes to the database
    return await this.statusRepository.save(status);
  }

  /**
   * Soft delete a status
   * @param id - Status ID to delete
   * @throws NotFoundException if status is not found
   */
  async deleteById(id: number): Promise<void> {
    // Perform soft delete
    const result = await this.statusRepository.softDelete(id);
    // Check if any record was affected
    if (result.affected === 0) {
      throw new NotFoundException(`Status with ID "${id}" not found`);
    }
  }

  /**
   * Restore a soft-deleted status
   * @param id - Status ID to restore
   * @returns The restored status
   */
  async restoreStatus(id: number): Promise<Status> {
    // Restore the soft-deleted status
    await this.statusRepository.restore(id);
    // Return the restored status
    return await this.findStatusById(id);
  }
  /**
   * Drop the statuses table (Destructive operation)
   * WARNING: This will delete all data in the table.
   */
  async dropTable(): Promise<void> {
    const queryRunner = this.statusRepository.manager.connection.createQueryRunner();
    try {
      await queryRunner.query('DROP TABLE IF EXISTS statuses CASCADE');
    } finally {
      await queryRunner.release();
    }
  }
}