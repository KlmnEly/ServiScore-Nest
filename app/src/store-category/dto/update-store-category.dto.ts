import { PartialType } from '@nestjs/mapped-types';
import { CreateStoreCategoryDto } from './create-store-category.dto';

export class UpdateStoreCategoryDto extends PartialType(CreateStoreCategoryDto) {
  // Aquí puedes agregar campos adicionales específicos para la actualización si es necesario
  // Por ejemplo, si quieres permitir actualizar el estado activo/inactivo
  isActive?: boolean;
}

export class UpdateStoreCategoryDto extends PartialType(CreateStoreCategoryDto) {}

