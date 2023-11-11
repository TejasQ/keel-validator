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
                    contents: await readFile(join(__dirname, "fixtures", "schema.keel.txt"), "utf8"),
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
                    contents: await readFile(join(__dirname, "fixtures", "schemaWithErrors.keel.txt"), "utf8"),
                },
            ],
        })

        expect(sanitizeValidationErrors(validationResult.errors)).toMatchInlineSnapshot(`
          "Failed with these errors:

          - Line 61: 'team' refers to a model which cannot used as an input. Inputs must target fields on models only, e.g team.id
          - Line 17-20: create actions must accept all required fields that have no default value. maybe add email to the with() inputs or a @set expression
          - Line 58-60: create actions must accept all required fields that have no default value. maybe add user to the with() inputs or a @set expression
          - Line 61: create actions must accept all required fields that have no default value. maybe add team.name to the with() inputs or a @set expression
          - Line 51: field user has an unsupported type User. Did you mean one of UserTeam?
          - Line 59: 'id' not found on 'User'. 
          - Line 59: 'user' not found on 'Identity'. Did you mean one of email, emailVerified, password, externalId, issuer, id, createdAt, updatedAt, or account?
          - Line 9: The field 'teams' does not have an associated field on UserTeam. In a one to many relationship, the related belongs-to field must exist on UserTeam. To learn more about relationships, visit https://docs.keel.so/models#relationships
          - Line 44: 'user' not found on 'Identity'. Did you mean one of email, emailVerified, password, externalId, issuer, id, createdAt, updatedAt, or account?
          - Line 68: Operator '=' not permitted on @permission. Did you mean ==?
          "
        `)
    })
})