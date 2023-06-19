import type { ClassType } from 'class-transformer-validator';
import type { ValidationFailureResult } from '../interfaces/validation-failure-result.js';
import type { ValidationSuccessResult } from '../interfaces/validation-success-result.js';
/**
 * Transforms and validates the form data in the request using the DTO provided.
 */
export declare function validateFormData<T extends object>(formData: FormData, dtoClass: ClassType<T>): Promise<ValidationSuccessResult<T> | ValidationFailureResult>;
