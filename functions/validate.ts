import { Validate } from '@teamkeel/sdk';

import { getKeel } from '../init';
import { sanitizeValidationErrors } from '../sanitizeErrors';

export default Validate(async (ctx, inputs) => {
    const schema = inputs.schema;
    const keel = await getKeel();
    const validationResult = await keel.validate({
        schemaFiles: [
            {
                filename: "schema.keel",
                contents: schema,
            },
        ],
    })
    return {
        errors: sanitizeValidationErrors(validationResult.errors),
    }
})