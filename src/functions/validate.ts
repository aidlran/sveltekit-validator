import { ClassType, transformAndValidate } from 'class-transformer-validator';
import type { ValidationError } from 'class-validator';
import type { ValidationFailureResult } from '../interfaces/validation-failure-result.js';
import type { ValidationSuccessResult } from '../interfaces/validation-success-result.js';

export async function validate<T extends object>(
  dtoClass: ClassType<T>,
  data: object,
): Promise<ValidationSuccessResult<T> | ValidationFailureResult> {
  let dto: T;

  try {
    dto = await transformAndValidate(dtoClass, data);
  } catch (error) {
    if (error instanceof Array<ValidationError>) {
      const errors: Record<string, string[]> = {};

      for (const validationError of error) {
        if (validationError.constraints) {
          errors[validationError.property] = Object.values(
            validationError.constraints,
          );
        }
      }

      return {
        ok: false,
        errors,
      } as ValidationFailureResult;
    }

    throw error;
  }

  return {
    ok: true,
    dto,
  } as ValidationSuccessResult<T>;
}
