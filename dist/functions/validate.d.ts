import { ClassType } from 'class-transformer-validator';
import type { ValidationFailureResult } from '../interfaces/validation-failure-result';
import type { ValidationSuccessResult } from '../interfaces/validation-success-result';
export declare function validate<T extends object>(dtoClass: ClassType<T>, data: object): Promise<ValidationSuccessResult<T> | ValidationFailureResult>;
