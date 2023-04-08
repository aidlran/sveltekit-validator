import type { ClassType } from 'class-transformer-validator';
/**
 * Middleware that transforms and validates the form data in the request using the DTO class provided.
 *
 * Automatically returns SvelteKit `ActionFailure` on failure.
 *
 * Otherwise adds the resulting DTO instance to the request object as `request.dto`.
 */
export declare function validateFormData<T extends object>(dtoClass: ClassType<T>): (target: object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => TypedPropertyDescriptor<any>;
