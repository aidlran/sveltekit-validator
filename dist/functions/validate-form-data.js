import { validate } from './validate.js';
/**
 * Transforms and validates the form data in the request using the DTO provided.
 */
export async function validateFormData(formData, dtoClass) {
    const parsedData = {};
    for (const entry of formData.entries()) {
        parsedData[entry[0]] = entry[1];
    }
    return validate(dtoClass, parsedData);
}
