import type { ClassType } from 'class-transformer-validator';
import type { ValidationFailureResult } from '../interfaces/validation-failure-result.js';
import type { ValidationSuccessResult } from '../interfaces/validation-success-result.js';
import { validate } from './validate.js';

/**
 * Transforms and validates the form data in the request using the DTO provided.
 */
export async function validateFormData<T extends object>(
  formData: FormData,
  dtoClass: ClassType<T>
): Promise<ValidationSuccessResult<T> | ValidationFailureResult> {
  const parsedData: Record<string, unknown> = {};

  for (const entry of formData.entries()) {
    parsedData[entry[0]] = entry[1];
  }

  return validate(dtoClass, parsedData);
}
