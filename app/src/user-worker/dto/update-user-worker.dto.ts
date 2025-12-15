import { PartialType } from '@nestjs/mapped-types';
import { CreateUserWorkerDto } from './create-user-worker.dto';

/**
 * DTO for updating a worker user
 * Inherits all fields from CreateUserWorkerDto but makes them optional
 */
export class UpdateUserWorkerDto extends PartialType(CreateUserWorkerDto) {}