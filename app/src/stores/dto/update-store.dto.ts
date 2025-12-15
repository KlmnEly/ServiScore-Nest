import { PartialType } from '@nestjs/swagger';
import { CreateStoreDto } from './create-store.dto';

// PartialType makes all fields inherited from CreateStoreDto optional.
export class UpdateStoreDto extends PartialType(CreateStoreDto) {
  // Any specific validation or field unique to updates can go here.
}