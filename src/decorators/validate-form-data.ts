import { json } from '@sveltejs/kit';
import type { ClassType } from 'class-transformer-validator';
import { validateFormData as validateFormDataFn } from '../functions/validate-form-data.js';

/**
 * Middleware that transforms and validates the form data in the request using the DTO class provided.
 *
 * Automatically returns a JSON response on failure.
 *
 * Otherwise adds the resulting DTO instance to the request object as `request.dto`.
 */
export function validateFormData<T extends object>(dtoClass: ClassType<T>) {
  return (
    target: object,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<any>,
  ) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const validationResult = await validateFormDataFn(
        await args[0].request.formData(),
        dtoClass,
      );

      if (!validationResult.ok) {
        return json({ errors: validationResult.errors }, { status: 400 });
      }

      args[0].request.dto = validationResult.dto;

      return await originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
