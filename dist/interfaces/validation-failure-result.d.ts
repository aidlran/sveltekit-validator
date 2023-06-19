import type { ValidationErrors } from '../types/validation-errors.js';
import type { ValidationResult } from './validation-result.js';
/**
 * @extends ValidationResult
 */
export interface ValidationFailureResult extends ValidationResult {
    ok: false;
    /**
     * An object of DTO property name keys and an array
     * of validation error message strings for that property.
     */
    errors: ValidationErrors;
}
