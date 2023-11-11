import { readFile } from "fs/promises";
import { join } from "path";
import { describe, it, expect } from "vitest";
import { getKeel } from "../init";
import { sanitizeValidationErrors } from "../sanitizeErrors";

describe("validate", async () => {
    it('should validate valid schemas', async () => {
        const keel = await getKeel();
        const validationResult = await keel.validate({
            schemaFiles: [
                {
                    filename: "schema.keel",
                    contents: await readFile(join(__dirname, "fixtures", "schema.keel"), "utf8"),
                },
            ],
        })
        expect(validationResult).toEqual({
            errors: [],
        })
    })
    it('should give nice errors when invalid', async () => {
        const keel = await getKeel();
        const validationResult = await keel.validate({
            schemaFiles: [
                {
                    filename: "schema.keel",
                    contents: await readFile(join(__dirname, "fixtures", "schemaWithErrors.keel"), "utf8"),
                },
            ],
        })

        expect(sanitizeValidationErrors(validationResult.errors)).toEqual(`Failed with these errors:

- 'team' refers to a model which cannot used as an input on line 61:40 until 61:44
- create actions must accept all required fields that have no default value on line 17:9 until 20:10
- create actions must accept all required fields that have no default value on line 58:9 until 60:10
- create actions must accept all required fields that have no default value on line 61:9 until 61:45
- field user has an unsupported type User on line 51:9 until 51:13
- 'id' not found on 'User' on line 59:32 until 59:34
- 'user' not found on 'Identity' on line 59:50 until 59:54
- The field 'teams' does not have an associated field on UserTeam on line 9:9 until 9:25
- 'user' not found on 'Identity' on line 44:34 until 44:38
- Operator '=' not permitted on @permission on line 68:35 until 68:36
`)
    })
})