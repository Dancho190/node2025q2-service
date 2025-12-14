import { validate as uuidValidate } from 'uuid';

// валидация айди
export function validateUUID(id: string): boolean {
  return uuidValidate(id);
}