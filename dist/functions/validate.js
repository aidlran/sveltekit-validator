import { transformAndValidate } from 'class-transformer-validator';
export async function validate(dtoClass, data) {
    let dto;
    try {
        dto = await transformAndValidate(dtoClass, data);
    }
    catch (error) {
        if (error instanceof (Array)) {
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
