import { transformAndValidate } from 'class-transformer-validator';
import { ValidationError } from 'class-validator';
export async function validate(dtoClass, data) {
    let dto;
    try {
        dto = await transformAndValidate(dtoClass, data);
    }
    catch (error) {
        if (error instanceof Array && error[0] instanceof ValidationError) {
            const errors = {};
            for (const validationError of error) {
                if (validationError.constraints) {
                    errors[validationError.property] = Object.values(validationError.constraints);
                }
            }
            return {
                ok: false,
                errors,
            };
        }
        throw error;
    }
    return {
        ok: true,
        dto,
    };
}
