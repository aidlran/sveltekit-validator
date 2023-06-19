import type { ValidationResult } from './validation-result.js';

/**
 * @extends ValidationResult
 */
export interface ValidationSuccessResult<T> extends ValidationResult {
  ok: true;

  /**
   * The validated DTO instance from the Request FormData.
   */
  dto: T;
}
