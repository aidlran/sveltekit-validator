import { ClassType } from 'class-transformer-validator';
import type { ValidationFailureResult } from '../interfaces/validation-failure-result.js';
import type { ValidationSuccessResult } from '../interfaces/validation-success-result.js';
export declare function validate<T extends object>(dtoClass: ClassType<T>, data: object): Promise<ValidationSuccessResult<T> | ValidationFailureResult>;
